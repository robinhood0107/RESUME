import resume from "./resume.json";

export const BASE_PATH = "/RESUME";
export const SITE_ORIGIN = "https://robinhood0107.github.io";
export const SITE_URL = `${SITE_ORIGIN}${BASE_PATH}`;
export const GITHUB_URL = resume.ko.github;
export const assetPath = (path: string) => `${BASE_PATH}${path}`;

export const profile = {
  name: resume.ko.name,
  nameEn: resume.en.name,
  role: resume.ko.title,
  tagline: "백엔드와 AI 기능을 연결하고,\n실행 결과를 확인하며 개선합니다.",
  summary: "Spring Boot·PostgreSQL 백엔드와 Python 기반 AI 기능을 연결하고, C++23·Rust로 개인정보 보호 Gateway를 개발하고 있습니다. AI가 구현을 도와도 사용한 기술과 변경 이유를 이해하고, 명세·테스트·리뷰로 제가 설명하고 수정할 수 있는 상태를 만들려고 합니다.",
  contacts: [
    { label: "Email", text: resume.ko.email, href: `mailto:${resume.ko.email}` },
    { label: "GitHub", text: "github.com/robinhood0107", href: GITHUB_URL },
    { label: "Portfolio", text: "robinhood0107.github.io/RESUME/portfolio/", href: `${SITE_URL}/portfolio/` },
  ],
  stats: [
    { value: "Backend", label: "주문·트랜잭션·상태 관리" },
    { value: "Local AI", label: "OCR·번역·모델 실행 연동" },
    { value: "Self-hosting", label: "NAS·OCI·Docker 운영" },
  ],
  principles: [
    { title: "이해하고 바꿀 수 있게 만듭니다", text: "새 기술은 작은 실험부터 확인합니다. AI가 작성한 코드도 사용한 이유와 동작을 이해하고, 제가 설명하고 수정할 수 있는 상태를 만들려고 합니다." },
    { title: "기준을 먼저 적습니다", text: "입력·출력·실패 조건과 모듈의 책임을 명세에 적습니다. 에이전트에게 한 번에 맡기는 범위를 나누고, 구현이 그 기준을 따르는지 확인합니다." },
    { title: "같은 조건으로 확인합니다", text: "lint·타입 검사와 실행 테스트를 나누어 적용합니다. 오류와 경계 조건을 재현하고, 성능을 바꿀 때는 같은 입력의 결과와 시간을 함께 봅니다." },
    { title: "다음에 읽을 수 있게 남깁니다", text: "선택한 이유는 주석과 설계 기록에, 확인한 결과는 테스트와 보고서에 남깁니다. 나중에 다시 검토하거나 확장할 때도 이해할 수 있는 코드를 지향합니다." },
  ],
  ai: {
    stance: "규모가 큰 졸업과제에서는 AI를 적극 활용합니다. 구현을 맡긴 뒤에도 사용한 기술과 변경 이유를 이해하고 명세·검사 도구·실행 결과로 통제할 수 있는 상황을 만들려 합니다.",
    evidence: [
      "AI 도구에 반복 구현과 테스트 초안, 검토를 맡기고 저는 설계 의도와 변경 내용을 이해하며 검증 결과를 직접 확인합니다. 커밋과 PR 진행은 제가 승인합니다.",
      "졸업과제는 원칙·주문·검색·모델·배포가 얽혀 있어 API·데이터 계약을 나누고 lint·타입 검사와 단위·통합·회귀 테스트, 실행 하네스로 결과를 확인합니다.",
      "PromptAirlock에서는 spec.md·AGENTS.md와 Phase별 완료 조건으로 작업 범위를 제한합니다. 타입으로 표현한 상태와 메모리·동시성 위험을 컴파일 시험과 sanitizer 등으로 확인합니다.",
      "OCR 프로젝트의 실행 보고서는 정해진 데이터 형식과 생성 코드로 출력합니다. 문서도 같은 항목과 기준으로 남겨 이후 검토와 비교에 사용할 수 있게 합니다.",
      "미국주식 모의투자는 설계·프로토타입에 AI를 활용했고 Net Zero Smart SCM은 직접 구축했습니다. 프로젝트마다 AI와 팀원이 맡은 범위를 구분해 적습니다.",
    ],
    caseStudy: "/portfolio/trading-coach/",
    caseStudyLabel: "AI 자동매매 졸업과제 케이스 스터디 보기 →",
    practiceCaseStudy: "/portfolio/prompt-airlock/",
    practiceCaseStudyLabel: "PromptAirlock의 설계·검증 방법 보기 →",
  },
};

export const ogBase = { type: "website", locale: "ko_KR", siteName: `${profile.name} | ${profile.role}` } as const;
