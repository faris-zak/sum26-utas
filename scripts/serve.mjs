import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";

const root = resolve(process.cwd());
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".webmanifest": "application/manifest+json; charset=utf-8",
  ".png": "image/png",
  ".webp": "image/webp",
  ".ttf": "font/ttf",
  ".txt": "text/plain; charset=utf-8"
};

const server = createServer(async (request, response) => {
  try {
    const requestUrl = new URL(request.url || "/", "http://localhost");
    let pathname = decodeURIComponent(requestUrl.pathname);
    if (pathname === "/") pathname = "/index.html";
    const candidate = normalize(join(root, pathname));
    if (!candidate.startsWith(root)) {
      response.writeHead(403).end("Forbidden");
      return;
    }
    const info = await stat(candidate);
    if (!info.isFile()) throw new Error("Not found");
    const body = await readFile(candidate);
    response.writeHead(200, {
      "Content-Type": mime[extname(candidate).toLowerCase()] || "application/octet-stream",
      "Cache-Control": "no-cache",
      "Service-Worker-Allowed": "/"
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Smart Student Guide running at http://localhost:${port}`);
});
