import resume from "./resume.json";

export const experiences = resume.ko.sections.find((section) => section.id === "experience")!.entries.map((entry) => ({
  company: entry.title,
  role: entry.subtitle,
  period: entry.caption,
  summary: "개인 NAS와 OCI Linux VM에서 Docker 기반으로 도서관·미디어 서비스와 개인 프로젝트를 운영합니다.",
  stack: ["Linux", "Docker", "NAS", "OCI", "Nginx"],
  bullets: entry.bullets,
}));
