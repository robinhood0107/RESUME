import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const studies = JSON.parse(readFileSync(new URL("../src/data/case-studies.json", import.meta.url)));
const resume = JSON.parse(readFileSync(new URL("../src/data/resume.json", import.meta.url)));

test("각 프로젝트의 상세 경로와 GitHub 연결이 고유하고 유효하다", () => {
  assert.equal(studies.length, 8);
  assert.equal(new Set(studies.map(s => s.slug)).size, studies.length);
  for (const study of studies) {
    assert.match(study.slug, /^[a-z0-9-]+$/);
    assert.equal(study.links.caseStudy, `/portfolio/${study.slug}/`);
    assert.equal(new URL(study.links.github).hostname, "github.com");
    assert.ok(study.sections.find(s => s.heading === "Overview"));
    assert.ok(study.sections.find(s => s.heading === "Role"));
    assert.ok(study.sections.find(s => s.heading === "System Architecture"));
    assert.ok(study.sections.find(s => s.heading === "Problem"));
    assert.ok(study.sections.find(s => s.heading.endsWith("Verification")));
    assert.ok(study.sections.find(s => s.heading === "Results"));
    assert.equal(new Set(study.sections.map(s => s.heading)).size, study.sections.length);
  }
});

test("모든 화면 자산이 실제 파일에 연결된다", () => {
  for (const study of studies) {
    assert.ok(study.sections.some(s => s.blocks.some(b => b.kind === "screens" && b.items.length > 0)), study.slug);
    const images = [study.cover, ...study.sections.flatMap(s => s.blocks).filter(b => b.kind === "screens").flatMap(b => b.items)].filter(Boolean);
    for (const image of images) {
      assert.match(image.src, /^\/images\//);
      assert.ok(existsSync(resolve("public", image.src.slice(1))), image.src);
      assert.ok(image.width > 0 && image.height > 0);
      assert.ok(image.caption, "기존 캡처의 출처 설명이 필요합니다");
    }
  }
});

test("이력서의 모든 프로젝트가 상세 페이지로 연결된다", () => {
  for (const entry of resume.ko.sections.find(s => s.id === "projects").entries) {
    assert.ok(studies.find(s => s.links.github === entry.link), entry.title);
  }
});

test("개인정보와 원본 작성자의 콘텐츠가 데이터에 남지 않는다", () => {
  const content = JSON.stringify({ studies, resume });
  assert.doesNotMatch(content, /mark77234|Byeongchan|이병찬|DailyOPIc|KillingPart|\bMARS\b|private-reference|sources_private|[A-Z]:\\|\/mnt\/c\/|\/home\//i);
});
