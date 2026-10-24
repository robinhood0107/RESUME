import type { Metadata } from "next";
import PrintButton from "@/components/PrintButton";
import ProjectLinks from "@/components/ProjectLinks";
import { Metrics, ProjectCover, ProjectHeader } from "@/components/CaseStudy";
import { caseStudies, caseStudySummary } from "@/data/caseStudies";
import { ogBase, profile, SITE_URL } from "@/data/profile";

export const metadata: Metadata = {
  title: "Portfolio",
  alternates: { canonical: `${SITE_URL}/portfolio/` },
  openGraph: { ...ogBase, url: `${SITE_URL}/portfolio/` },
  twitter: { card: "summary" },
  description: `${profile.name}의 포트폴리오 — 백엔드, AI 응용, 모바일, FPGA 프로젝트의 문제와 해결 과정을 기록합니다.`,
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
          {"문제와 구현 과정을 살펴보고,\n제가 맡은 역할과\n확인한 결과를 함께 기록합니다."}
        </p>
      </header>

      {/* ---------------------------------------------------------- projects */}
      <section className="mt-12">
        <div className="space-y-16 print:space-y-10">
          {caseStudies.map((study) => {
            const { overview, results } = caseStudySummary(study);

            return (
              <article key={study.slug} className="print-keep border-t border-ink pt-8">
                <ProjectHeader study={study} />

                {study.cover && <ProjectCover cover={study.cover} />}

                <p className="mt-8 text-[15px] leading-[1.8] print:mt-5 print:text-[10pt]">
                  {overview}
                </p>

                {results.length > 0 && (
                  <div className="mt-6">
                    <Metrics items={results} />
                  </div>
                )}

                {study.links && (
                  <div className="mt-6">
                    <ProjectLinks links={study.links} />
                  </div>
                )}
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
}
