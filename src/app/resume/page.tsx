import type { Metadata } from "next";
import ProjectLinks from "@/components/ProjectLinks";
import SectionHeading from "@/components/SectionHeading";
import { assetPath, ogBase, profile, SITE_URL } from "@/data/profile";
import { skills } from "@/data/skills";
import { experiences } from "@/data/experience";
import { resumeProjects } from "@/data/projects";
import { activities, education } from "@/data/activities";

export const metadata: Metadata = {
  title: "Resume",
  description: `${profile.nameEn}의 이력서 — 개발 경험, 기술, 대표 프로젝트와 활동.`,
  alternates: { canonical: `${SITE_URL}/resume/` },
  openGraph: { ...ogBase, url: `${SITE_URL}/resume/` },
  twitter: { card: "summary" },
};

/** 이름/기간처럼 좌우로 갈라지는 한 줄. 좁은 화면에서는 자연스럽게 쌓인다. */
function ItemHead({ title, period }: { title: string; period: string }) {
  return (
    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
      <h3 className="text-[17px] font-semibold tracking-tight">{title}</h3>
      <span className="text-[13px] text-faint">{period}</span>
    </div>
  );
}

function Bullets({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-3 space-y-2 print:mt-2.5">
      {items.map((item) => (
        <li
          key={item}
          className="relative pl-4 text-[14px] leading-[1.75] before:absolute before:left-0 before:text-faint before:content-['–'] print:text-[10pt]"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function StackLine({ items }: { items: readonly string[] }) {
  return <p className="mt-2.5 text-[12.5px] text-faint">{items.join(" · ")}</p>;
}

export default function ResumePage() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-12 sm:px-8 sm:py-16 print:max-w-none print:px-0 print:py-0">
      <div className="no-print mb-8 flex flex-wrap justify-end gap-3 text-[13px] text-muted">
        <a href={assetPath("/assets/pdf/resume-ko.pdf")} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-rule px-3 py-1.5 hover:border-ink hover:text-ink">한국어 PDF 보기·인쇄 ↗</a>
        <a href={assetPath("/assets/pdf/resume-ko.pdf")} download className="rounded-sm border border-rule px-3 py-1.5 hover:border-ink hover:text-ink">PDF 다운로드 ↓</a>
        <a href={assetPath("/assets/pdf/resume-en.pdf")} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-rule px-3 py-1.5 hover:border-ink hover:text-ink">English PDF ↗</a>
      </div>
      <header className="print-keep border-b-2 border-ink pb-6">
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
          <div>
            <h1 className="text-[30px] font-semibold tracking-tight print:text-[22pt]">
              {profile.name}
            </h1>
            <p className="mt-1 text-[15px] text-muted">
              {profile.nameEn} · {profile.role}
            </p>
          </div>
          <ul className="text-[13px] leading-[1.7] text-muted sm:text-right">
            {profile.contacts.map((contact) => (
              <li key={contact.label}>
                <span className="mr-2 text-faint">{contact.label}</span>
                <a
                  href={contact.href}
                  target={contact.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel={contact.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                  className="hover:text-ink hover:underline"
                >
                  {contact.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </header>
      <section className="print-section mt-10 print:mt-7">
        <SectionHeading index="01">Profile</SectionHeading>
        <p className="text-[15px] leading-[1.75] print:text-[10.5pt]">{profile.summary}</p>
      </section>
      <section className="print-section mt-10 print:mt-7">
        <SectionHeading index="02">Selected Projects</SectionHeading>
        <div className="space-y-9 print:space-y-6">
          {resumeProjects.map((project) => (
            <article key={project.name} className="print-keep">
              <ItemHead title={project.name} period={project.period} />
              <p className="mt-1 text-[14px] text-muted">{project.role}</p>

              <p className="mt-3 text-[14.5px] leading-[1.7] print:text-[10pt]">
                {project.summary}
              </p>
              <Bullets items={project.bullets} />
              <StackLine items={project.stack} />

              {project.links && (
                <div className="mt-2.5">
                  <ProjectLinks links={project.links} compact />
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
      <section className="print-section mt-10 print:mt-7">
        <SectionHeading index="03">Skills</SectionHeading>
        <dl className="space-y-3">
          {skills.map((group) => (
            <div
              key={group.category}
              className="print-keep grid grid-cols-1 gap-x-6 gap-y-1 sm:grid-cols-[150px_1fr]"
            >
              <dt className="text-[13px] font-semibold">{group.category}</dt>
              <dd className="text-[14px] leading-[1.7] text-faint print:text-[10pt]">
                <span className="font-medium text-ink">{group.strong.join(" · ")}</span>
                {group.items.length > 0 && ` · ${group.items.join(" · ")}`}
              </dd>
            </div>
          ))}
        </dl>
      </section>
      <section className="print-section mt-10 print:mt-7">
        <SectionHeading index="04">Experience</SectionHeading>
        <div className="space-y-9 print:space-y-6">
          {experiences.map((exp) => (
            <article key={exp.company} className="print-keep">
              <ItemHead title={exp.company} period={exp.period} />
              <p className="mt-1 text-[14px] text-muted">{exp.role}</p>

              <p className="mt-3 text-[14.5px] leading-[1.7] print:text-[10pt]">{exp.summary}</p>
              <Bullets items={exp.bullets} />
              <StackLine items={exp.stack} />

            </article>
          ))}
        </div>
      </section>

      <section className="print-section mt-10 print:mt-7">
        <SectionHeading index="05">Activities</SectionHeading>
        <ul className="space-y-6">
          {activities.map((activity) => (
            <li key={activity.title} className="print-keep">
              <ItemHead title={activity.title} period={activity.caption} />
              <p className="mt-1 text-[14px] text-muted">{activity.subtitle}</p>
              {activity.bullets.length > 0 && <Bullets items={activity.bullets} />}
              {activity.link && <a href={activity.link} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-[13px] text-accent underline">Team GitHub ↗</a>}
            </li>
          ))}
        </ul>
      </section>
      <section className="print-section mt-10 print:mt-7">
        <SectionHeading index="06">Education</SectionHeading>
        {education.map((entry) => (
          <div key={entry.title} className="print-keep">
            <ItemHead title={entry.title} period={entry.caption} />
            <p className="mt-1 text-[14px] text-muted">{entry.subtitle}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
