import { copyFileSync, readdirSync } from "node:fs";
import { join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const output = fileURLToPath(new URL("../out/", import.meta.url));

// shortcut: Next 16.3 exports Windows segment paths as folders; remove once upstream normalizes separators.
for (const file of readdirSync(output, { recursive: true, withFileTypes: true })) {
  if (!file.isFile() || !file.name.endsWith(".txt")) continue;
  const source = join(file.parentPath, file.name);
  const parts = relative(output, source).split(sep);
  const start = parts.findIndex(part => part.startsWith("__next."));
  if (start === -1 || start === parts.length - 1) continue;
  const target = join(output, ...parts.slice(0, start), parts.slice(start).join("."));
  copyFileSync(source, target);
}
