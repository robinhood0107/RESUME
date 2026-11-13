import resume from "./resume.json";

export const skills = [
  { category: "Backend", strong: ["Java", "Spring Boot", "Python"], items: ["Kotlin", "FastAPI", "PostgreSQL", "Redis", "WebSocket"] },
  { category: "AI / LLM", strong: ["로컬 OCR과 LLM 실행 경로 연동"], items: ["PaddleOCR-VL", "HunyuanOCR", "Gemma", "llama.cpp"] },
  { category: "Infrastructure", strong: ["Docker", "Linux"], items: ["NAS와 OCI 개인 서비스 운영", "GitHub Actions", "Nginx"] },
  { category: "Others", strong: [], items: ["Kotlin Android, Jetpack Compose, Room 앱 프로젝트 경험", "pytest, JUnit과 동일 입력 비교"] },
  { category: "Languages", strong: [], items: resume.ko.sections.find((section) => section.id === "skills")!.entries.find((entry) => entry.title === "어학")!.bullets },
];
