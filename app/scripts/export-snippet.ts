/**
 * npm run figma:snippet -- [frameId ...] [--port=9223] [--chunk=10]
 *
 * Prints the figma_execute code that exports the given Figma frames (default: all) as 2x PNGs and
 * POSTs them to the receiver (scripts/figma-receiver.py). Paste each block into one figma_execute
 * call. Frame ids and node ids come from tests/visual/screens.ts. See scripts/export-figma.md.
 */
import { FRAMES, findFrame, type FrameSpec } from '../tests/visual/screens.ts';

const args = process.argv.slice(2);
const option = (name: string) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3);
const ids = args.filter((a) => !a.startsWith('--'));
const port = Number(option('port') ?? 9223);
const chunk = Math.max(1, Number(option('chunk') ?? 10));

const unknown = ids.filter((id) => !findFrame(id));
if (unknown.length > 0) {
  console.error(`Unknown frame id: ${unknown.join(', ')}. "npm run diff -- --list" shows the ids.`);
  process.exit(2);
}
const frames: FrameSpec[] = ids.length > 0 ? ids.map((id) => findFrame(id)!) : [...FRAMES];

const blocks: string[] = [];
for (let i = 0; i < frames.length; i += chunk) {
  const list = frames
    .slice(i, i + chunk)
    .map((f) => ` ['${f.id}','${f.nodeId}']`)
    .join(',\n');
  blocks.push(`const list = [
${list}
];
const out = [];
for (const [name, id] of list) {
  try {
    const node = await figma.getNodeByIdAsync(id);
    if (!node) { out.push({ name, id, error: 'no node' }); continue; }
    const bytes = await node.exportAsync({ format: 'PNG', constraint: { type: 'SCALE', value: 2 } });
    const q = 'name=' + name + '&id=' + encodeURIComponent(id) + '&frame=' + encodeURIComponent(node.name) + '&w=' + node.width + '&h=' + node.height;
    const r = await fetch('http://localhost:${port}/?' + q, { method: 'POST', body: bytes });
    out.push({ name, id, frame: node.name, w: node.width, h: node.height, status: r.status });
  } catch (e) { out.push({ name, id, error: String(e) }); }
}
return out;`);
}

console.log(`// ${frames.length} frame${frames.length === 1 ? '' : 's'}, ${blocks.length} figma_execute call${blocks.length === 1 ? '' : 's'} (timeout 30000), receiver on port ${port}\n`);
blocks.forEach((b, i) => console.log(`// ---- call ${i + 1} of ${blocks.length} ----\n${b}\n`));
