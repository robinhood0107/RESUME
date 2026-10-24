import studies from "./case-studies.json";

export type Block =
  | { kind: "text"; text: string }
  | { kind: "list"; items: string[] }
  | { kind: "flow"; steps: string[] }
  | { kind: "stack"; groups: { label: string; items: string[] }[] }
  | { kind: "metrics"; items: { value: string; label: string }[] }
  | { kind: "cards"; items: { title: string; text: string }[] }
  | { kind: "screens"; layout: ScreenLayout; items: Screenshot[] }
  | { kind: "diagram"; caption?: string; stages: DiagramStage[] };

/** phone = 세로 앱 스크린샷, wide = 16:9 발표/웹 화면 */
export type ScreenLayout = "phone" | "wide";

export type Screenshot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  title: string;
  caption?: string;
};

export type DiagramStage = {
  title: string;
  note?: string;
  items?: string[];
  /** 조건 분기가 있는 단계 (예: 앱 설치 여부) */
  branches?: { label: string; title: string; items?: string[] }[];
};

export type CaseSection = {
  heading: string;
  blocks: Block[];
};

/** 프로젝트에 연결할 링크. 없는 필드는 생략한다. */
export type ProjectLinks = {
  caseStudy?: string;
  appStore?: string;
  playStore?: string;
  live?: string;
  github?: string;
  frontend?: string;
  ai?: string;
};

export type CaseStudy = {
  slug: string;
  index: string;
  name: string;
  subtitle: string;
  period?: string;
  role: string;
  context: string;
  stack: string[];
  /** 서비스 공식 대표 이미지. Intro 바로 다음에 가장 먼저 노출한다. */
  cover?: Screenshot;
  /**
   * 시스템 아키텍처 이미지의 alt. 값을 넣으면 상세 페이지 Overview 다음에 섹션이 붙는다.
   * 이미지 경로는 /images/<slug>/system_architecture.png 규칙을 따른다.
   */
  systemArchitectureAlt?: string;
  links?: ProjectLinks;
  sections: CaseSection[];
};

export const caseStudies = studies as CaseStudy[];

/**
 * 메인 Portfolio Overview 카드용 요약.
 * 별도 필드로 중복 관리하지 않고 상세 본문의 Overview / Results를 그대로 재사용한다.
 */
export function caseStudySummary(study: CaseStudy) {
  const overview = study.sections
    .find((section) => section.heading === "Overview")
    ?.blocks.find((block) => block.kind === "text");
  const results = study.sections
    .find((section) => section.heading === "Results")
    ?.blocks.find((block) => block.kind === "metrics");

  return {
    overview: overview?.kind === "text" ? overview.text : "",
    results: results?.kind === "metrics" ? results.items.slice(0, 3) : [],
  };
}

export function findCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
