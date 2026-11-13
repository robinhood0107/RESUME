import resume from "./resume.json";

export const skills = [
  { category: "Backend", strong: ["Java", "Spring Boot", "Python", "FastAPI", "PostgreSQL"], items: ["Kotlin", "Redis", "WebSocket", "MySQL"] },
  { category: "AI / LLM", strong: ["로컬 OCR와 LLM 연동", "RAG"], items: ["pgvector", "llama.cpp", "PaddleOCR-VL", "HunyuanOCR", "Gemma", "vLLM", "Ollama", "GPT-SoVITS"] },
  { category: "Infrastructure", strong: ["Docker", "Linux", "NAS와 OCI 셀프호스팅"], items: ["GitHub Actions", "Nginx", "Windows 실행 자동화"] },
  { category: "Verification", strong: ["pytest", "JUnit", "GoogleTest", "동일 입력 비교"], items: ["Ruff와 mypy", "ktlint와 detekt", "타입와 계약 검사", "sanitizer와 property와 fuzz 시험 구성"] },
  { category: "Others", strong: ["Kotlin Android", "Jetpack Compose", "Room"], items: ["HTML와 CSS와 JavaScript 발표 사이트", "Python 보고서와 애니메이션 생성"] },
  { category: "Languages", strong: [], items: resume.ko.sections.find((section) => section.id === "skills")!.entries.find((entry) => entry.title === "어학")!.bullets },
];
