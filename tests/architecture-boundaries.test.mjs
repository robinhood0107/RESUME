import { readFileSync } from "node:fs";
import { test } from "node:test";
import assert from "node:assert/strict";

const svg = (name) => readFileSync(`public/images/${name}/architecture.svg`, "utf8");

test("화상면접 제어와 미디어 연결을 구분한다", () => {
  const irya = svg("irya");
  assert.match(irya, /세션, 토큰 API/);
  assert.match(irya, /클라이언트 ↔ 미디어/);
  assert.match(irya, /세션 제어/);
  assert.doesNotMatch(irya, /30일 자동 삭제|속도 제한/);
});

test("콘솔과 웹 및 발표 사이트의 관계선을 처리 순서로 표현하지 않는다", () => {
  for (const name of ["net-zero-scm", "prompt-airlock-webslide"]) {
    assert.doesNotMatch(svg(name), /marker-end=/);
  }
  assert.match(svg("net-zero-scm"), /콘솔: 메뉴 → DAO/);
});
