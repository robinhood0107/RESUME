import resume from "./resume.json";
import { caseStudies } from "./caseStudies";

const entries = resume.ko.sections.find((section) => section.id === "projects")!.entries;

export const resumeProjects = entries.map((entry) => {
  const study = caseStudies.find((study) => study.links?.github === entry.link)!;
  return {
    name: study.name,
    role: entry.subtitle,
    period: entry.caption,
    summary: study.sections[0].blocks.find((block) => block.kind === "text")?.text ?? "",
    stack: study.stack,
    bullets: entry.bullets,
    links: study.links,
  };
});
