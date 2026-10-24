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
  summary: "Spring Boot·PostgreSQL 백엔드와 Python 기반 AI 기능을 연결하는 프로젝트를 해왔습니다. 주문·잔고의 상태 변경, 로컬 OCR·번역 모델 연동, NAS·OCI 셀프호스팅을 경험했습니다.",
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
    { title: "조건부터 확인합니다", text: "주문이나 송금처럼 상태가 바뀌는 작업은 입력과 규칙, 실패했을 때의 처리를 먼저 살핍니다." },
    { title: "같은 입력으로 비교합니다", text: "OCR 요청 경로와 캐시를 바꿀 때 동일한 입력의 시간과 결과를 함께 확인했습니다." },
    { title: "역할을 분명히 기록합니다", text: "팀원이 맡은 모델 학습과 화면 작업, 제가 맡은 백엔드와 연동 범위를 구분합니다." },
    { title: "직접 운영하며 배웁니다", text: "NAS와 OCI에서 개인 서비스를 운영하며 캐시, 인증서, 요청 경로 문제를 확인하고 고쳤습니다." },
  ],
  ai: {
    stance: "AI의 해석과 실제 상태를 바꾸는 판단을 구분합니다.",
    evidence: [
      "AI 자동매매 졸업과제에서 규칙 기반 후보 생성과 모델의 제외 신호, 주문 전 검사를 나누었습니다.",
      "저는 PM과 주문 판단 백엔드를 맡았고, LSTM 학습·Return Engine·대시보드 UX는 팀원이 담당했습니다.",
      "같은 데이터로 신호 결합 방식을 비교하고, 모의주문 시나리오에서 중복 제출 방지와 체결·잔고 반영을 확인했습니다.",
    ],
    caseStudy: "/portfolio/trading-coach/",
    caseStudyLabel: "AI 자동매매 졸업과제 케이스 스터디 보기 →",
  },
};

export const ogBase = { type: "website", locale: "ko_KR", siteName: `${profile.name} | ${profile.role}` } as const;
