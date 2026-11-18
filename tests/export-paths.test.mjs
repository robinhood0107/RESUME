import { test } from "node:test";
import assert from "node:assert/strict";
import { copyFileSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve, sep } from "node:path";
import { spawnSync } from "node:child_process";

test("Windows에서 생성한 중첩 prefetch 파일을 브라우저 요청 경로로 복사한다", () => {
  const root = mkdtempSync(join(tmpdir(), "resume-export-"));
  try {
    mkdirSync(join(root, "scripts"));
    const script = join(root, "scripts/normalize_export_paths.mjs");
    copyFileSync(new URL("../scripts/normalize_export_paths.mjs", import.meta.url), script);
    const route = join(root, "out/portfolio/example");
    mkdirSync(join(route, "__next.portfolio/$d$slug"), { recursive: true });
    writeFileSync(join(route, "__next.portfolio/$d$slug/__PAGE__.txt"), "page segment");
    writeFileSync(join(route, "__next._tree.txt"), "tree segment");
    writeFileSync(join(route, "index.html"), "<h1>Portfolio</h1>");
    assert.equal(existsSync(join(route, "__next.portfolio.$d$slug.__PAGE__.txt")), false);
    for (let run = 0; run < 2; run++) {
      const result = spawnSync(process.execPath, [script], { encoding: "utf8" });
      assert.equal(result.status, 0, result.stderr);
      assert.equal(readFileSync(join(route, "__next.portfolio.$d$slug.__PAGE__.txt"), "utf8"), "page segment");
    }
    assert.equal(readFileSync(join(route, "__next._tree.txt"), "utf8"), "tree segment");
    assert.equal(readFileSync(join(route, "index.html"), "utf8"), "<h1>Portfolio</h1>");
  } finally {
    assert.ok(resolve(root).startsWith(resolve(tmpdir()) + sep));
    rmSync(root, { recursive: true });
  }
});
