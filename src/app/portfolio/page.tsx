import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import PrintButton from "@/components/PrintButton";
import { Metrics, ProjectHeader } from "@/components/CaseStudy";
import { caseStudies } from "@/data/caseStudies";
import { assetPath, ogBase, SITE_URL } from "@/data/profile";

export const metadata: Metadata = {
  title: "Portfolio",
  alternates: { canonical: `${SITE_URL}/portfolio/` },
  openGraph: { ...ogBase, url: `${SITE_URL}/portfolio/` },
  twitter: { card: "summary" },
  description: "개발 포트폴리오. 프로젝트의 목적, 문제 정의, 역할, 기술, 전체 아키텍처와 결과를 소개합니다.",
};

export default function PortfolioPage() {
  return (
    <div className="mx-auto max-w-[860px] px-5 py-12 sm:px-8 sm:py-16 print:max-w-none print:px-0 print:py-0">
      <div className="no-print mb-8 flex justify-end">
        <PrintButton />
      </div>

      <header className="print-keep">
        <h1 className="text-[32px] font-semibold tracking-tight sm:text-[40px]">Portfolio</h1>
        <p className="mt-5 max-w-xl whitespace-pre-line text-[16px] leading-[1.75] text-muted sm:text-[17px]">
          {"프로그램이 하는 일과\n제가 맡아 바꾼 부분을 소개합니다."}
        </p>
      </header>


      <nav aria-label="프로젝트 바로가기" className="no-print mt-8 border-y border-rule py-4">
        <ul className="flex flex-wrap gap-x-5 gap-y-3 text-[13px] text-muted">
          {caseStudies.map((study) => <li key={study.slug}><a href={`#${study.slug}`} className="hover:text-accent hover:underline">{study.index} {study.name}</a></li>)}
        </ul>
      </nav>

      <section className="mt-12" aria-label="대표 프로젝트 소개">
        <div className="space-y-16 print:space-y-10">
          {caseStudies.map((study) => {
            const overview = study.sections.find((section) => section.heading === "Overview")?.blocks.find((block) => block.kind === "text");
            const result = study.sections.find((section) => section.heading === "Results")?.blocks.find((block) => block.kind === "text");
            const metrics = study.sections.find((section) => section.heading === "Results")?.blocks.find((block) => block.kind === "metrics");

            return (
              <article id={study.slug} key={study.slug} className="print-section scroll-mt-8 border-t border-ink pt-8">
                <Link href={`/portfolio/${study.slug}/`} aria-label={`${study.name} 자세히 보기`} className="group block">
                  <ProjectHeader study={study} />
                  {overview?.kind === "text" && <p className="mt-8 text-[15px] leading-[1.8]">{overview.text}</p>}
                  {result?.kind === "text" && <p className="mt-4 text-[14px] leading-[1.75] text-muted">{result.text}</p>}
                  {metrics?.kind === "metrics" && <div className="mt-5"><Metrics items={metrics.items.slice(0, 4)} /></div>}
                  {study.cover && (
                    <Image
                      src={assetPath(study.cover.src)}
                      alt={study.cover.alt}
                      width={study.cover.width}
                      height={study.cover.height}
                      sizes="(max-width: 860px) 100vw, 860px"
                      className="mt-6 h-auto max-h-[360px] w-full border border-rule object-contain"
                    />
                  )}
                  <span className="mt-5 inline-block text-[14px] text-accent underline underline-offset-4 group-hover:decoration-2">자세히 보기 →</span>
                </Link>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
