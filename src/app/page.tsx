import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import { GITHUB_URL, profile } from "@/data/profile";

export default function Home() {
  return (
    <div className="mx-auto max-w-[1060px] px-5 py-20 sm:px-8 sm:py-28">
      <section className="max-w-2xl">
        <h1 className="text-[34px] font-semibold leading-tight tracking-tight sm:text-[44px]">
          {profile.name}
        </h1>
        <p className="mt-2 text-[17px] text-muted sm:text-[19px]">
          {profile.nameEn} · {profile.role}
        </p>

        <p className="mt-8 whitespace-pre-line text-[19px] leading-[1.65] sm:text-[22px]">
          {profile.tagline}
        </p>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/portfolio/"
            className="rounded-sm bg-ink px-5 py-2.5 text-[14px] font-medium text-white transition-opacity hover:opacity-85"
          >
            Portfolio
          </Link>
          <Link
            href="/resume/"
            className="rounded-sm border border-ink px-5 py-2.5 text-[14px] font-medium transition-colors hover:bg-ink hover:text-white"
          >
            Resume
          </Link>
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-rule px-5 py-2.5 text-[14px] font-medium text-muted transition-colors hover:border-ink hover:text-ink"
          >
            GitHub
            <span className="sr-only"> (새 창에서 열림)</span>
          </a>
        </div>
      </section>

      <section
        aria-label="주요 개발 영역"
        className="mt-20 border-t border-rule pt-10"
      >
        <dl className="grid grid-cols-1 gap-8 sm:grid-cols-3">
          {profile.stats.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd>
                <span className="block text-[30px] font-semibold tracking-tight">
                  {stat.value}
                </span>
                <span className="mt-1 block text-[14px] text-muted">
                  {stat.label}
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-20">
        <SectionHeading>How I Work</SectionHeading>
        <dl className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2">
          {profile.principles.map((p) => (
            <div key={p.title}>
              <dt className="text-[16px] font-semibold">{p.title}</dt>
              <dd className="mt-1 text-[15px] leading-[1.7] text-muted">{p.text}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="mt-16 max-w-2xl">
        <SectionHeading>How I Work with AI</SectionHeading>
        <p className="text-[17px] leading-[1.7]">{profile.ai.stance}</p>
        <ul className="mt-5 list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-muted">
          {profile.ai.evidence.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ul>
        <Link
          href={profile.ai.caseStudy}
          className="mt-5 inline-block text-[14px] font-medium underline underline-offset-4 hover:opacity-70"
        >
          {profile.ai.caseStudyLabel}
        </Link>
      </section>
    </div>
  );
}
