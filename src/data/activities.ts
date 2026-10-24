import resume from "./resume.json";

export const activities = resume.ko.sections.find((section) => section.id === "external_activities")!.entries;
export const education = resume.ko.sections.find((section) => section.id === "education")!.entries;
