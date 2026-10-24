import resume from "./resume.json";
import { caseStudies } from "./caseStudies";

const entries = resume.ko.sections.find((section) => section.id === "projects")!.entries;

export const resumeProjects = entries.slice(0, 4).map((entry, index) => ({
  name: caseStudies[index].name,
  role: entry.subtitle,
  period: entry.caption,
  summary: caseStudies[index].sections[0].blocks.find((block) => block.kind === "text")?.text ?? "",
  stack: caseStudies[index].stack,
  bullets: entry.bullets,
  links: caseStudies[index].links,
}));
