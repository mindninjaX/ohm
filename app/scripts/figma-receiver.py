#!/usr/bin/env python3
"""
Tiny local receiver for Figma exports (see scripts/export-figma.md).

The Figma plugin cannot write files, but it can fetch() to localhost ports 9223 to 9232 (the Desktop
Bridge manifest allows only those). Run this, then POST the exported PNG bytes from figma_execute:

    POST http://localhost:9223/?name=S01-1&id=9:7427&w=393&h=1121    (body = PNG bytes)

writes tests/figma/S01-1.png and records the frame in tests/figma/manifest.json.

    python3 scripts/figma-receiver.py [port]      # default 9223

Default 9223. The figma-console MCP servers take most of 9224 to 9232 (more than one can run) and
other agents may hold others, so check with lsof and pick any free port in 9223 to 9232 (the manifest limit).
Writes only inside tests/figma, only .png, only names made of letters, digits, dot, dash, underscore.
"""
import json
import os
import re
import socket
import sys
import time
from http.server import BaseHTTPRequestHandler, HTTPServer
from urllib.parse import parse_qs, urlparse

PORT = int(sys.argv[1]) if len(sys.argv) > 1 else 9223
OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..", "tests", "figma")
OUT = os.path.normpath(OUT)
MANIFEST = os.path.join(OUT, "manifest.json")
NAME_RE = re.compile(r"^[A-Za-z0-9_.-]{1,64}$")
MAX_BYTES = 40 * 1024 * 1024


def load_manifest():
    try:
        with open(MANIFEST, "r", encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return {}


class Handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "POST, GET, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "*")

    def _reply(self, code, body):
        data = json.dumps(body).encode()
        self.send_response(code)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(data)))
        self.end_headers()
        self.wfile.write(data)

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        files = sorted(f for f in os.listdir(OUT) if f.endswith(".png")) if os.path.isdir(OUT) else []
        self._reply(200, {"status": "ok", "out": OUT, "files": files})

    def do_POST(self):
        q = parse_qs(urlparse(self.path).query)
        name = (q.get("name") or [""])[0]
        if not NAME_RE.match(name):
            return self._reply(400, {"error": "bad name"})
        length = int(self.headers.get("Content-Length") or 0)
        if length <= 0 or length > MAX_BYTES:
            return self._reply(400, {"error": "bad length", "length": length})
        body = self.rfile.read(length)
        if not body.startswith(b"\x89PNG\r\n\x1a\n"):
            return self._reply(400, {"error": "not a PNG"})
        os.makedirs(OUT, exist_ok=True)
        path = os.path.join(OUT, name + ".png")
        with open(path, "wb") as f:
            f.write(body)
        # PNG header: width and height are big-endian ints at bytes 16 to 24.
        px_w = int.from_bytes(body[16:20], "big")
        px_h = int.from_bytes(body[20:24], "big")
        manifest = load_manifest()
        manifest[name] = {
            "nodeId": (q.get("id") or [""])[0],
            "frameName": (q.get("frame") or [""])[0],
            "figmaWidth": (q.get("w") or [""])[0],
            "figmaHeight": (q.get("h") or [""])[0],
            "pngWidth": px_w,
            "pngHeight": px_h,
            "bytes": len(body),
            "exportedAt": time.strftime("%Y-%m-%dT%H:%M:%S%z"),
        }
        with open(MANIFEST, "w", encoding="utf-8") as f:
            json.dump(dict(sorted(manifest.items())), f, indent=2)
            f.write("\n")
        self._reply(200, {"ok": True, "name": name, "bytes": len(body), "pngWidth": px_w, "pngHeight": px_h})

    def log_message(self, fmt, *args):
        sys.stderr.write("[figma-receiver] " + fmt % args + "\n")


class DualStackServer(HTTPServer):
    """Listen on IPv4 and IPv6, because "localhost" can resolve to either."""

    address_family = socket.AF_INET6

    def server_bind(self):
        self.socket.setsockopt(socket.IPPROTO_IPV6, socket.IPV6_V6ONLY, 0)
        super().server_bind()


if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    httpd = DualStackServer(("::", PORT), Handler)
    print(f"[figma-receiver] listening on http://localhost:{PORT}/  writing to {OUT}", flush=True)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
