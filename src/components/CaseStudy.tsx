import { assetPath } from "@/data/profile";
import Image from "next/image";
import ProjectLinks from "@/components/ProjectLinks";
import explanations from "@/data/project-explanations.json";
import type {
  Block,
  CaseStudy as CaseStudyType,
  DiagramStage,
  ScreenLayout,
  Screenshot,
  ProjectExplanation,
} from "@/data/caseStudies";

/** 서비스 공식 대표 이미지. 원본 비율 그대로, crop·mockup 없이 크게 보여준다. */
export function ProjectCover({ cover }: { cover: Screenshot }) {
  return (
    <figure className="print-keep print-cover mt-8 print:mt-5">
      <a href={assetPath(cover.src)} target="_blank" rel="noopener noreferrer" aria-label={`${cover.title} 원본 이미지 열기 (새 창)`}>
        <Image
          src={assetPath(cover.src)}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes="(max-width: 860px) 100vw, 860px"
          className="h-auto max-h-[440px] w-full border border-rule object-contain"
        />
      </a>
      {cover.caption && (
        <figcaption className="mt-2 text-[12px] leading-[1.55] text-muted">
          {cover.caption}
        </figcaption>
      )}
    </figure>
  );
}

const phoneCols: Record<number, string> = {
  1: "grid-cols-1 sm:grid-cols-2",
  2: "grid-cols-2",
  3: "grid-cols-2 sm:grid-cols-3",
  4: "grid-cols-2 md:grid-cols-4",
  5: "grid-cols-2 md:grid-cols-5",
};

function ScreenshotGrid({
  layout,
  items,
}: {
  layout: ScreenLayout;
  items: Screenshot[];
}) {
  const isPhone = layout === "phone";
  const cols = isPhone
    ? (phoneCols[items.length] ?? "grid-cols-2 md:grid-cols-4")
    : items.length === 1
      ? "grid-cols-1"
      : "grid-cols-1 sm:grid-cols-2";

  return (
    <ul className={`grid gap-x-4 gap-y-6 ${cols}`}>
      {items.map((shot) => (
        <li
          key={shot.src}
          className={`print-keep ${isPhone ? "print-shot" : "print-shot-wide"}`}
        >
          <figure>
            <div
              className={shot.src.endsWith("/architecture.svg") ? "overflow-x-auto" : undefined}
              tabIndex={shot.src.endsWith("/architecture.svg") ? 0 : undefined}
              role={shot.src.endsWith("/architecture.svg") ? "region" : undefined}
              aria-label={shot.src.endsWith("/architecture.svg") ? "전체 아키텍처, 좌우로 이동 가능" : undefined}
            >
            <a
              href={assetPath(shot.src)}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${shot.title} 원본 이미지 열기 (새 창)`}
            >
              <Image
                src={assetPath(shot.src)}
                alt={shot.alt}
                width={shot.width}
                height={shot.height}
                loading="lazy"
                sizes={isPhone ? "(max-width: 768px) 45vw, 200px" : "(max-width: 640px) 100vw, 420px"}
                className={`h-auto w-full rounded-sm border border-rule object-contain ${shot.src.endsWith("/architecture.svg") ? "min-w-[720px] print:min-w-0" : ""}`}
              />
            </a>
            </div>
            <figcaption className="mt-2">
              <span className="block text-[12.5px] font-semibold">{shot.title}</span>
              {shot.caption && shot.caption !== shot.title && (
                <span className="mt-0.5 block text-[12px] leading-[1.55] text-muted">
                  {shot.caption}
                </span>
              )}
              {shot.src.endsWith("/architecture.svg") && <>
                <span className="mt-1 block text-[12px] text-muted sm:hidden">작은 화면에서는 구조도를 좌우로 밀어 볼 수 있습니다.</span>
                <a href={assetPath(shot.src)} target="_blank" rel="noopener noreferrer" className="mt-1 block text-[12px] text-accent underline underline-offset-4">구조도 원본 열기 ↗</a>
              </>}
            </figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

function Chips({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 flex flex-wrap gap-1.5">
      {items.map((item) => (
        <li
          key={item}
          className="print-keep-color rounded-sm bg-[#f4f4f5] px-2 py-0.5 text-[11.5px] text-muted"
        >
          {item}
        </li>
      ))}
    </ul>
  );
}

function StageBox({ stage }: { stage: DiagramStage }) {
  return (
    <div className="rounded-sm border border-rule px-4 py-3">
      <p className="text-[13.5px] font-semibold">{stage.title}</p>
      {stage.note && <p className="mt-0.5 text-[12px] text-faint">{stage.note}</p>}
      {stage.items && <Chips items={stage.items} />}
    </div>
  );
}

function Arrow() {
  return (
    <div aria-hidden="true" className="py-1 text-center text-[13px] leading-none text-faint">
      ↓
    </div>
  );
}

/** 세로 방향 단계도. 모바일에서도 그대로 reflow되므로 축소가 필요 없다. */
function Diagram({ caption, stages }: { caption?: string; stages: DiagramStage[] }) {
  return (
    <figure className="print-keep">
      {caption && (
        <figcaption className="mb-2 text-[12px] font-semibold uppercase tracking-[0.12em] text-faint">
          {caption}
        </figcaption>
      )}
      <ol>
        {stages.map((stage, i) => (
          <li key={stage.title}>
            {i > 0 && <Arrow />}
            {stage.branches ? (
              <div>
                <StageBox stage={{ title: stage.title, note: stage.note, items: stage.items }} />
                <Arrow />
                <div className="grid gap-3 sm:grid-cols-2">
                  {stage.branches.map((branch) => (
                    <div key={branch.label} className="rounded-sm border border-rule px-4 py-3">
                      <span className="print-keep-color rounded-sm bg-ink px-1.5 py-0.5 text-[10.5px] font-semibold uppercase tracking-wider text-white">
                        {branch.label}
                      </span>
                      <p className="mt-2 text-[13.5px] font-semibold">{branch.title}</p>
                      {branch.items && <Chips items={branch.items} />}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <StageBox stage={stage} />
            )}
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** 상세 페이지에서 조건과 함께 보여주는 결과 수치. */
export function Metrics({ items }: { items: { value: string; label: string }[] }) {
  return (
    <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {items.map((item) => (
        <div key={item.label}>
          <dt className="sr-only">{item.label}</dt>
          <dd>
            <span className="block text-[22px] font-semibold tracking-tight">{item.value}</span>
            <span className="mt-0.5 block text-[13px] text-muted">{item.label}</span>
          </dd>
        </div>
      ))}
    </dl>
  );
}

function EngineeringCards({ items }: { items: { title: string; text: string }[] }) {
  return (
    <ul className="grid gap-x-6 gap-y-5 sm:grid-cols-2">
      {items.map((item) => (
        <li key={item.title} className="print-keep border-t border-ink pt-3">
          <h3 className="text-[13.5px] font-semibold">{item.title}</h3>
          <p className="mt-1.5 text-[13.5px] leading-[1.65] text-muted print:text-[9.5pt]">
            {item.text}
          </p>
        </li>
      ))}
    </ul>
  );
}

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "code":
      return (
        <pre tabIndex={0} role="region" aria-label={`${block.language} 예시`} className="overflow-x-auto rounded-sm border border-rule bg-[#f8fafc] p-4 text-[12.5px] leading-[1.8]">
          <code>{block.code}</code>
        </pre>
      );
    case "table":
      return (
        <div className="max-w-full overflow-x-auto" tabIndex={0} role="region" aria-label="프로젝트 설명 표">
          <table className="w-full min-w-[620px] border-collapse text-left text-[13px] leading-[1.65]">
            <thead>
              <tr>{block.headers.map((header) => <th key={header} className="border-b border-ink px-3 py-2 font-semibold">{header}</th>)}</tr>
            </thead>
            <tbody>
              {block.rows.map((row, index) => (
                <tr key={index}>{row.map((cell, column) => <td key={column} className="border-b border-rule px-3 py-2 align-top">{cell}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "references":
      return (
        <ul className="space-y-2 text-[13px] leading-[1.7]">
          {block.items.map((item) => (
            <li key={item.href}>
              <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">{item.label} ↗</a>
            </li>
          ))}
        </ul>
      );
    case "text":
      return (
        <p className="break-keep text-[15px] leading-[1.8] text-ink print:text-[10pt]">{block.text}</p>
      );

    case "list":
      return (
        <ul className="space-y-2">
          {block.items.map((item) => (
            <li
              key={item}
              className="relative pl-4 text-[15px] leading-[1.75] before:absolute before:left-0 before:text-faint before:content-['–'] print:text-[10pt]"
            >
              {item}
            </li>
          ))}
        </ul>
      );

    case "flow":
      return (
        <ol className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px]">
          {block.steps.map((step, i) => (
            <li key={step} className="flex items-center gap-2">
              {i > 0 && (
                <span aria-hidden="true" className="text-faint">
                  →
                </span>
              )}
              <span className="print-keep-color rounded-sm bg-[#f4f4f5] px-2.5 py-1">{step}</span>
            </li>
          ))}
        </ol>
      );

    case "stack":
      return (
        <dl className="space-y-2.5">
          {block.groups.map((group) => (
            <div key={group.label} className="grid grid-cols-1 gap-x-6 sm:grid-cols-[130px_1fr]">
              <dt className="text-[13px] font-semibold">{group.label}</dt>
              <dd className="text-[14px] leading-[1.7] text-muted print:text-[10pt]">
                {group.items.join(", ")}
              </dd>
            </div>
          ))}
        </dl>
      );

    case "metrics":
      return <Metrics items={block.items} />;

    case "cards":
      return <EngineeringCards items={block.items} />;

    case "screens":
      return block.title ? (
        <div>
          <h3 className="font-semibold">{block.title}</h3>
          <div className="mt-4"><ScreenshotGrid layout={block.layout} items={block.items} /></div>
        </div>
      ) : <ScreenshotGrid layout={block.layout} items={block.items} />;

    case "video":
      return (
        <figure>
          <video controls playsInline preload="metadata" poster={assetPath(block.poster)} aria-label={block.title} className="h-auto max-h-[520px] w-full border border-rule bg-[#f8fafc] object-contain">
            {block.sources.map((source) => <source key={source.src} src={assetPath(source.src)} type={source.type} />)}
            {block.captions && <track kind="captions" src={assetPath(block.captions.src)} srcLang={block.captions.srcLang} label={block.captions.label} default />}
            {block.sources.map((source) => <a key={source.src} href={assetPath(source.src)} download>영상 내려받기 ({source.type === "video/mp4" ? "MP4" : "WebM"})</a>)}
          </video>
          <figcaption className="mt-2 text-[13px] leading-[1.7] text-muted">
            <span className="block font-semibold">{block.title}</span>
            {block.description !== block.title && <span className="block">{block.description}</span>}
            {block.sources.map((source) => <a key={source.src} href={assetPath(source.src)} download className="mr-4 underline underline-offset-4">영상 내려받기 ({source.type === "video/mp4" ? "MP4" : "WebM"})</a>)}
          </figcaption>
        </figure>
      );

    case "diagram":
      return <Diagram caption={block.caption} stages={block.stages} />;
  }
}

/** 상세 페이지의 역할 및 기술 정보. */
export function ProjectHeader({
  study,
  as: Heading = "h2",
}: {
  study: CaseStudyType;
  as?: "h1" | "h2";
}) {
  return (
    <header className="print-keep">
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <Heading className="break-keep text-[24px] font-semibold tracking-tight sm:text-[28px]">
          <span className="mr-3 align-middle text-[14px] font-normal text-faint">
            {study.index}
          </span>
          {study.name}
        </Heading>
        {study.period && <span className="text-[13px] text-faint">{study.period}</span>}
      </div>
      <p className="mt-1.5 text-[16px] text-muted">{study.subtitle}</p>
      <p className="mt-3 text-[13px] text-faint">{study.context}</p>
      <dl className="mt-4 space-y-2 text-[13px] leading-[1.7]">
        <div className="grid grid-cols-[48px_1fr] gap-3"><dt className="text-muted">역할</dt><dd>{study.role}</dd></div>
        <div className="grid grid-cols-[48px_1fr] gap-3"><dt className="text-muted">기술</dt><dd>{study.stack.join(", ")}</dd></div>
      </dl>
    </header>
  );
}

const sectionLabels: Record<string, string> = {
  Overview: "프로그램 목적",
  Problem: "문제 정의",
  Product: "작동 원리",
  "System Architecture": "전체 아키텍처",
  "Design Decisions": "설계 이유",
  Development: "내가 맡은 부분",
  Results: "확인한 결과",
};

export default function CaseStudy({ study }: { study: CaseStudyType }) {
  const explanation = (explanations as Record<string, ProjectExplanation>)[study.slug];
  const cover = study.cover?.src.endsWith("/architecture.svg") ? undefined : study.cover;
  const media = study.sections
    .flatMap((section) => section.blocks)
    .flatMap((block): Block[] => {
      if (block.kind === "video") return [block];
      if (block.kind !== "screens") return [];
      const items = block.items.filter((item) => !item.src.endsWith("/architecture.svg") && item.src !== cover?.src);
      return items.length ? [{ ...block, items }] : [];
    });
  const mediaSection = (cover || media.length > 0) ? (
    <section id="demo" className="scroll-mt-8 border-t border-rule pt-5">
      <h2 className="text-[14px] font-semibold">화면과 시연</h2>
      <div className="mt-5 space-y-8">
        {media.filter((block) => block.kind === "video").map((block, i) => <BlockView key={`video-${i}`} block={block} />)}
        {cover && !media.some((block) => block.kind === "video" && block.poster === cover.src) && <ProjectCover cover={cover} />}
        {media.filter((block) => block.kind === "screens").map((block, i) => <BlockView key={`screens-${i}`} block={block} />)}
      </div>
    </section>
  ) : null;

  return (
    <article className="print-section border-t border-ink pt-8">
      <ProjectHeader study={study} as="h1" />
      {study.links && (
        <div id={study.slug === "prompt-airlock" ? "presentation-materials" : undefined} className="mt-6">
          <ProjectLinks links={{ ...study.links, caseStudy: undefined }} grouped />
        </div>
      )}

      {explanation && (
        <details id="explanation" className="mt-8 rounded-sm border border-rule px-5 py-4">
          <summary className="cursor-pointer text-[16px] font-semibold">설명</summary>
          <div className="mt-8 space-y-10">
            <p className="text-[12px] text-muted">
              기준 코드: <a href={`${explanation.repository}/tree/${explanation.revision}`} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">{explanation.revision.slice(0, 10)} ↗</a>
            </p>
            {explanation.sections.map((section, index) => (
              <section key={section.heading} className="min-w-0">
                <h3 className="mb-4 text-[17px] font-semibold">{index + 1}. {section.heading}</h3>
                <div className="space-y-4">{section.blocks.map((block, i) => <BlockView key={i} block={block} />)}</div>
              </section>
            ))}
          </div>
        </details>
      )}

      <div className="mt-10 space-y-10 print:mt-6 print:space-y-6">
        {study.sections.filter((section) => section.heading !== "화면과 시연").map((section) => (
          <div key={section.heading} className="space-y-10 print:space-y-6">
            <section id={section.heading === "System Architecture" ? "architecture" : undefined} className="print-keep scroll-mt-8">
              <h2 className="mb-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-faint">
                {sectionLabels[section.heading] ?? section.heading}
              </h2>
              <div className="space-y-4">
                {section.blocks.map((block, i) => <BlockView key={i} block={block} />)}
              </div>
            </section>
            {section.heading === "Overview" && mediaSection}
          </div>
        ))}
      </div>
    </article>
  );
}
