# Exporting the Figma frames (re-run this when a frame changes)

Every built frame in `specs/dev/SCREENS.md` has an exact 2x PNG in `tests/figma/<id>.png` (`S01.1` is `S01-1.png`), plus `tests/figma/manifest.json` (node id, frame name, size, export time). `npm run diff` and the `/compare/<id>` page read these. Last full export: 14 Oct 2026, 34 frames.

The frame list (id, node id, route) is `tests/visual/screens.ts`. `npm run diff -- --list` prints it.

## What it does

The Figma plugin cannot write files, but it can `fetch` to localhost ports 9223 to 9232 (the Desktop Bridge manifest, `~/Projects/figma-desktop-bridge-plugin/manifest.json`, allows only those). So:

1. a tiny Python receiver listens on a local port and writes each POSTed PNG to `tests/figma/<name>.png`;
2. `figma_execute` exports a frame with `node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } })` and POSTs the bytes to the receiver.

The export is exact: 393 x 1121 in Figma is 786 x 2242 on disk. The Figma file is only read, never changed.

## Steps

1. **Figma Desktop** has the file "Bill app" (`mwmHwXDuayUYeliDAlv3Fo`) open with the Desktop Bridge plugin running, and the figma-console MCP is connected to it. Check with `figma_list_open_files` (the Bill app should be `activeFileKey`; `figma_navigate` with `lock` pins it if another file is active).

2. **Start the receiver** on a free port in 9223 to 9232. The figma-console MCP servers take most of them (each running session takes one, more than one can run), and other agents may hold others, so check first:

   ```
   cd /Users/rishabh/Projects/ohm/app
   for p in 9223 9224 9225 9226 9227 9228 9229 9230 9231 9232; do lsof -iTCP:$p -sTCP:LISTEN -n -P >/dev/null || echo "free: $p"; done
   python3 scripts/figma-receiver.py 9223 &        # npm run figma:receiver does the same on 9223
   curl -s http://localhost:9223/                  # {"status": "ok", ...}
   ```

   14 Oct: 9229 and 9231 to 9232 were taken (MCP servers, another agent's receiver), 9223 was free. A port that answers `{"status": "ok", "version": "1.40...", "clients": ...}` is an MCP server, not free. The receiver listens on IPv4 and IPv6 (`localhost` can be either) and accepts only PNG bytes, only into `tests/figma`, only names made of letters, digits, dot, dash and underscore.

3. **Get the code** for the frames you want (all of them with no ids; ten per call so each call stays well under the 30 s limit, an export takes about 0.1 s):

   ```
   npm run figma:snippet -- S06 S01-1 --port=9223        # these two
   npm run figma:snippet -- --port=9223                  # all frames, in blocks of 10
   ```

   Paste each block into one `figma_execute` call (timeout 30000). One frame per call also works: the block with a one-line list. The result lists `{ name, id, frame, w, h, status: 200 }` per frame; `error: 'no node'` means the node id is gone (see "If a node id is gone").

   The code, for one frame, if you want to write it by hand:

   ```js
   const id = '9:7427';                       // S01 Home
   const node = await figma.getNodeByIdAsync(id);
   const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } });
   const q = 'name=S01&id=' + encodeURIComponent(id) + '&frame=' + encodeURIComponent(node.name) + '&w=' + node.width + '&h=' + node.height;
   const r = await fetch('http://localhost:9223/?' + q, { method: 'POST', body: bytes });
   return { name: node.name, w: node.width, h: node.height, status: r.status, reply: await r.text() };
   ```

   The plugin sandbox has no `URLSearchParams`; build the query by hand as above.

4. **Check**: `ls tests/figma | wc -l` (frames + `manifest.json`), the reply's `pngWidth` is 786 and `pngHeight` is twice the frame height, and `npm run diff <ids>` now reports the new numbers. Then stop the receiver (`pkill -f figma-receiver.py`, or `kill` its PID; only yours).

## Gotchas (seen 13 and 14 Oct)

- `figma_execute` times out at 30 s, but the code keeps running in the plugin. If a call times out, look at `tests/figma/manifest.json` (`exportedAt`) before running it again, so you do not export twice.
- Reading sublayers of an instance can fail with "node ... does not exist" (stale instance ids in a backdrop). `exportAsync` on the frame itself still works; do not walk the tree for an export.
- Frames grow to their content, so a frame's height changes when its content does. The PNG is whatever the frame is now; `npm run diff` shows a "size differs" row when the app disagrees.
- Another agent may be tidying the file (frames moved into sections, renamed). Node ids survive a move; a rename changes only `frameName` in the manifest. Do not rely on the page or section name.
- Screenshot tools (`figma_capture_screenshot`) cap the longest side at 1568 px, so they cannot give an exact 2x PNG of a tall frame. Use this method.
- The bridge only allows `http://localhost:9223` to `9232`. Another port is blocked by the plugin's network access list.

## If a node id is gone

A frame that was deleted and rebuilt has a new id. Find it by name, then fix `nodeId` in `tests/visual/screens.ts` (and the table in `specs/dev/COMPONENT_MAP.md`):

```js
await figma.loadAllPagesAsync();
const hits = figma.root.findAll(n => n.type === 'FRAME' && /^S06 /.test(n.name));
return hits.map(n => ({ id: n.id, name: n.name, page: (function p(x){ while (x && x.type !== 'PAGE') x = x.parent; return x && x.name; })(n), w: n.width, h: n.height }));
```

## After exporting

```
npm run diff S06            # one frame: table row, tests/visual/out/S06-side.png (Figma | app | diff)
npm run diff                # all frames, writes tests/visual/out/index.html (worst first)
```

Then look at `/ohm/compare/S06` (dev server, port 8810) for the overlay and the difference blend.
