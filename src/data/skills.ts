import resume from "./resume.json";

export const skills = [
  { category: "Backend", strong: ["Java", "Spring Boot", "Python", "FastAPI", "PostgreSQL"], items: ["Kotlin", "Redis", "WebSocket", "MySQL"] },
  { category: "AI / LLM", strong: ["로컬 OCR·LLM 연동", "RAG"], items: ["pgvector", "llama.cpp", "PaddleOCR-VL", "HunyuanOCR", "Gemma", "vLLM", "Ollama", "GPT-SoVITS"] },
  { category: "Infrastructure", strong: ["Docker", "Linux", "NAS·OCI 셀프호스팅"], items: ["GitHub Actions", "Nginx", "Windows 실행 자동화"] },
  { category: "Native / Systems", strong: ["C++23", "Rust Vault 프로젝트"], items: ["RAII", "단계 타입", "Protobuf IPC", "CMake·Cargo"] },
  { category: "Verification", strong: ["pytest", "JUnit", "GoogleTest", "동일 입력 비교"], items: ["Ruff·mypy", "ktlint·detekt", "타입·계약 검사", "sanitizer·property·fuzz 시험 구성"] },
  { category: "AI-assisted Work", strong: ["명세·하네스 기반 검토"], items: ["단계별 작업 범위", "직접 검증·커밋·PR 승인"] },
  { category: "Others", strong: ["Kotlin Android", "Jetpack Compose", "Room"], items: ["HTML·CSS·JavaScript 발표 사이트", "Python 보고서·애니메이션 생성"] },
  { category: "Languages", strong: [], items: resume.ko.sections.find((section) => section.id === "skills")!.entries.find((entry) => entry.title === "어학")!.bullets },
];
