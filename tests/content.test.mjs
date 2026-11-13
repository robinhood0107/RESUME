import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";

const studies = JSON.parse(readFileSync(new URL("../src/data/case-studies.json", import.meta.url)));
const resume = JSON.parse(readFileSync(new URL("../src/data/resume.json", import.meta.url)));
const learning = JSON.parse(readFileSync(new URL("../src/data/learning.json", import.meta.url)));
const datePattern = /\b20\d{2}-\d{2}-\d{2}\b|20\d{2}년\s*\d{1,2}월\s*\d{1,2}일/;
const captionText = data => JSON.stringify(data.flatMap(study => study.sections.flatMap(section => section.blocks).flatMap(block => block.kind === "screens" ? block.items.map(item => item.caption) : block.kind === "video" ? [block.description] : [])));

test("각 프로젝트의 상세 경로와 GitHub 연결이 고유하고 유효하다", () => {
  assert.equal(studies.length, 10);
  assert.equal(new Set(studies.map(s => s.slug)).size, studies.length);
  for (const study of studies) {
    assert.match(study.slug, /^[a-z0-9-]+$/);
    assert.equal(study.links.caseStudy, `/portfolio/${study.slug}/`);
    assert.equal(new URL(study.links.github).hostname, "github.com");
    assert.ok(study.sections.find(s => s.heading === "Overview"));
    assert.ok(study.sections.find(s => s.heading === "Role"));
    assert.ok(study.sections.find(s => s.heading === "System Architecture"));
    assert.ok(study.sections.find(s => s.heading === "Scope & Modules"));
    assert.ok(study.sections.find(s => s.heading === "Language & Design"));
    assert.ok(study.sections.find(s => s.heading === "Test Strategy"));
    assert.ok(study.sections.find(s => s.heading === "Measured Results"));
    assert.ok(study.sections.find(s => s.heading === "Problem"));
    assert.ok(study.sections.find(s => s.heading.endsWith("Verification")));
    assert.ok(study.sections.find(s => s.heading === "Results"));
    assert.equal(new Set(study.sections.map(s => s.heading)).size, study.sections.length);
  }
});

test("학습 기록은 공개 출처 또는 존재하는 내부 사례로 연결된다", () => {
  assert.equal(new Set(learning.map(group => group.title)).size, learning.length);
  const internal = new Set(["/resume/#experience", ...studies.map(s => s.links.caseStudy)]);
  for (const group of learning) {
    assert.ok(group.title && group.summary && group.items.length);
    for (const item of group.items) {
      assert.ok(item.title && item.description);
      for (const link of item.links) {
        if (link.href.startsWith("/")) assert.ok(internal.has(link.href), link.href);
        else {
          assert.equal(new URL(link.href).protocol, "https:");
          assert.equal(new URL(link.href).hostname, "github.com");
        }
      }
    }
  }
});

test("수치 비교표의 열과 행이 일치하고 조건 설명이 있다", () => {
  for (const study of studies) {
    const measured = study.sections.find(s => s.heading === "Measured Results");
    const tables = measured.blocks.filter(b => b.kind === "table");
    assert.ok(tables.length > 0, study.slug);
    for (const table of tables) {
      assert.ok(table.headers.length >= 3 && table.rows.length > 0);
      for (const row of table.rows) {
        assert.equal(row.length, table.headers.length, study.slug);
        assert.ok(row.every(cell => typeof cell === "string" && cell.trim()));
      }
    }
  }
});

test("구조도와 근거 링크가 실제 공개 자산과 HTTPS 출처를 가리킨다", () => {
  for (const study of studies) {
    const architecture = study.sections.find(s => s.heading === "System Architecture");
    const images = architecture.blocks.filter(b => b.kind === "screens").flatMap(b => b.items);
    assert.ok(images.some(image => image.src === `/images/${study.slug}/architecture.svg`), study.slug);
    for (const block of study.sections.flatMap(s => s.blocks).filter(b => b.kind === "references")) {
      for (const item of block.items) {
        assert.equal(new URL(item.href).protocol, "https:");
        assert.ok(item.label);
      }
    }
  }
});

test("모든 화면 자산이 실제 파일에 연결된다", () => {
  for (const study of studies) {
    assert.ok(study.sections.some(s => s.blocks.some(b => b.kind === "screens" && b.items.length > 0)), study.slug);
    const images = [study.cover, ...study.sections.flatMap(s => s.blocks).filter(b => b.kind === "screens").flatMap(b => b.items)].filter(Boolean);
    for (const image of images) {
      assert.match(image.src, /^\/(?:images|portfolio-media)\/[a-zA-Z0-9_/-]+\.(?:png|jpe?g|webp|svg)$/);
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
  const profile = readFileSync(new URL("../src/data/profile.ts", import.meta.url), "utf8");
  const content = JSON.stringify({ studies, resume, profile, learning });
  assert.doesNotMatch(content, /mark77234|Byeongchan|이병찬|DailyOPIc|KillingPart|\bMARS\b|private-reference|sources_private|[A-Z]:\\|\/mnt\/c\/|\/home\//i);
  const publicCases = JSON.stringify({ studies, learning });
  assert.ok(!/(?:생년월일|주민등록번호|birth\s*date)\s*[:：]?\s*\d|(?:\+82[- .]?)?0?1[016789][- .]\d{3,4}[- .]\d{4}\b|\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b|(?:api[_-]?key|secret[_-]?key|access[_-]?token)\s*[:=]\s*[A-Za-z0-9_-]{16,}/i.test(publicCases), "사례 또는 학습 자료의 개인정보나 키 패턴 확인 필요");
  assert.doesNotMatch(captionText(studies), datePattern);
});

test("날짜 예외와 미디어 경로 제한을 구분한다", () => {
  const sample = [{ sections: [{ blocks: [{ kind: "text", text: "2026-10-23" }, { kind: "screens", items: [{ caption: "화면" }] }] }] }];
  assert.doesNotMatch(captionText(sample), datePattern);
  sample[0].sections[0].blocks[1].items[0].caption = "2026-10-23";
  assert.match(captionText(sample), datePattern);
  const imagePath = /^\/(?:images|portfolio-media)\/[a-zA-Z0-9_/-]+\.(?:png|jpe?g|webp|svg)$/;

  assert.match("/portfolio-media/project/asset.png", imagePath);
  assert.doesNotMatch("/portfolio-media/../../private.png", imagePath);
});
test("동영상과 이미지 묶음이 하위 경로와 대체 링크를 포함해 렌더링된다", async () => {
  const { default: ts } = await import("typescript");
  const { createRequire } = await import("node:module");
  const { runInNewContext } = await import("node:vm");
  const { createElement } = await import("react");
  const { renderToStaticMarkup } = await import("react-dom/server");
  const require = createRequire(import.meta.url);
  const source = readFileSync(new URL("../src/components/CaseStudy.tsx", import.meta.url), "utf8");
  const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX } }).outputText;
  const compiledModule = { exports: {} };
  const imports = {
    "@/data/profile": { assetPath: path => `/RESUME${path}` },
    "@/components/ProjectLinks": { __esModule: true, default: () => null },
    "@/data/caseStudies": { caseStudySummary: () => ({ overview: "요약", results: [] }) },
    "next/image": { __esModule: true, default: props => createElement("img", props) },
  };
  runInNewContext(compiled, { module: compiledModule, exports: compiledModule.exports, require: name => imports[name] ?? require(name) });
  const study = { index: "1", name: "예시", subtitle: "예시", context: "팀", role: "역할", stack: [], sections: [{ heading: "자료", blocks: [
    { kind: "screens", title: "화면 흐름", layout: "wide", items: [{ src: "/images/example.png", title: "화면", alt: "화면 설명", width: 640, height: 360 }] },
    { kind: "video", title: "시연", description: "시연 내용 설명", poster: "/images/poster.png", sources: [{ src: "/videos/demo.mp4", type: "video/mp4" }, { src: "/videos/demo.webm", type: "video/webm" }], captions: { src: "/videos/demo.vtt", srcLang: "ko", label: "한국어" } },
  ] }] };
  const html = renderToStaticMarkup(createElement(compiledModule.exports.default, { study }));
  assert.match(html, /<details[^>]*><summary[^>]*>화면 흐름/);
  assert.match(html, /src="\/RESUME\/images\/example.png"[^>]*loading="lazy"/);
  assert.match(html, /<video[^>]*controls=""[^>]*playsInline=""[^>]*preload="metadata"[^>]*poster="\/RESUME\/images\/poster.png"/);
  assert.doesNotMatch(html.match(/<video[^>]*>/)[0], /\s(?:autoPlay|autoplay|muted)=/);
  assert.match(html, /src="\/RESUME\/videos\/demo.mp4" type="video\/mp4"/);
  assert.match(html, /src="\/RESUME\/videos\/demo.webm" type="video\/webm"/);
  assert.match(html, /kind="captions" src="\/RESUME\/videos\/demo.vtt"/);
  assert.match(html, /시연 내용 설명/);
  assert.match(html, /href="\/RESUME\/videos\/demo.mp4" download=""/);
});


test("동영상 자산은 로컬 MP4와 설명을 포함한다", () => {
  for (const study of studies) {
    for (const block of study.sections.flatMap(section => section.blocks).filter(block => block.kind === "video")) {
      assert.ok(block.title && block.description && block.sources.length);
      assert.equal(block.sources[0].type, "video/mp4");
      for (const source of block.sources) {
        assert.match(source.src, source.type === "video/mp4" ? /^\/(?:videos|portfolio-media)\/[a-zA-Z0-9_/-]+\.mp4$/ : /^\/(?:videos|portfolio-media)\/[a-zA-Z0-9_/-]+\.webm$/);
        assert.ok(["video/mp4", "video/webm"].includes(source.type));
        assert.ok(existsSync(resolve("public", source.src.slice(1))), source.src);
      }
      assert.match(block.poster, /^\/(?:images|portfolio-media)\/[a-zA-Z0-9_/-]+\.(?:png|jpe?g|webp)$/);
      assert.ok(existsSync(resolve("public", block.poster.slice(1))), block.poster);
      if (block.captions) {
        assert.match(block.captions.src, /^\/(?:videos|portfolio-media)\/[a-zA-Z0-9_/-]+\.vtt$/);
        assert.ok(block.captions.srcLang && block.captions.label);
        assert.ok(existsSync(resolve("public", block.captions.src.slice(1))), block.captions.src);
      }
    }
  }
});
