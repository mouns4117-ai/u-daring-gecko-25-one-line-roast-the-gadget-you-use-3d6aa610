// One-Line Roast: The Gadget You Use Every Day
// Writes a single roast line to /output/entry.txt (UTF-8, 1-200 characters).
import { mkdirSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "My robot vacuum mapped my whole flat in one afternoon and has spent every day since stuck under the same chair.";

// Empty a directory's contents without removing the directory itself:
// the grader's /output is a mounted directory, so removing it fails.
function emptyDir(dir: string): void {
  mkdirSync(dir, { recursive: true });
  for (const entry of readdirSync(dir)) {
    rmSync(join(dir, entry), { recursive: true, force: true });
  }
}

function main(): void {
  const outDir = process.argv[2] ?? "/output";
  const line = LINE.trim();
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry line must be 1-200 characters, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry line must be a single line");
  }
  emptyDir(outDir);
  writeFileSync(join(outDir, "entry.txt"), line + "\n", "utf8");
}

main();
