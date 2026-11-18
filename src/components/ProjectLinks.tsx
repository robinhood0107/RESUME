import Link from "next/link";
import type { ProjectLinks as Links } from "@/data/caseStudies";

const cta: { key: keyof Links; label: string; compactLabel?: string }[] = [
  { key: "github", label: "소스 코드 ↗" },
  { key: "frontend", label: "Frontend 소스 ↗" },
  { key: "ai", label: "AI Server 소스 ↗" },
  { key: "appStore", label: "App Store ↗" },
  { key: "playStore", label: "Google Play ↗" },
  { key: "live", label: "서비스 열기 ↗" },
  { key: "demo", label: "시연 영상 보기 →" },
  { key: "presentation", label: "발표 자료 ↗" },
  { key: "introduction", label: "프로젝트 소개 ↗" },
  { key: "caseStudy", label: "프로젝트 상세 →", compactLabel: "Details →" },
];

export default function ProjectLinks({
  links,
  compact = false,
  grouped = false,
}: {
  links: Links;
  /** Resume처럼 본문 글자가 작은 곳에서 사용 */
  compact?: boolean;
  grouped?: boolean;
}) {
  const items = cta.filter((item) => links[item.key]);
  if (items.length === 0 && !grouped) return null;

  const list = (entries: typeof cta) => (
    <ul
      className={`flex flex-wrap items-baseline gap-x-6 gap-y-2 ${
        compact ? "text-[12.5px]" : "text-[14px]"
      }`}
    >
      {entries.map((item) => {
        const href = links[item.key] as string;
        const isInternal = href.startsWith("/");
        // 화살표는 인쇄본에서도 유지한다. PDF에서 클릭 가능한 링크임을 알리는 신호다.
        const label = compact ? (item.compactLabel ?? item.label) : item.label;
        const className = isInternal
          ? "text-muted underline-offset-4 hover:text-ink hover:underline"
          : "font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent";

        return (
          <li key={item.key}>
            {isInternal ? (
              <Link href={href} className={className}>
                {label}
              </Link>
            ) : (
              <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
                {label}
              </a>
            )}
          </li>
        );
      })}
    </ul>
  );

  if (!grouped) return list(items);

  const groups: { label: string; keys: (keyof Links)[]; empty?: string }[] = [
    { label: "데모 링크", keys: ["live", "demo", "appStore", "playStore"], empty: "공개 데모 링크 없음" },
    { label: "소스 코드", keys: ["github", "frontend", "ai"], empty: "공개 소스 링크 없음" },
    { label: "관련 자료", keys: ["presentation", "introduction"] },
    { label: "자세히 보기", keys: ["caseStudy"] },
  ];
  return (
    <dl className="space-y-3 text-[13px]">
      {groups.map((group) => {
        const entries = items.filter((item) => group.keys.includes(item.key));
        if (!entries.length && !group.empty) return null;
        return (
          <div key={group.label} className="grid gap-1 sm:grid-cols-[100px_1fr] sm:gap-4">
            <dt className="text-muted">{group.label}</dt>
            <dd>{entries.length ? list(entries) : <span className="text-faint">{group.empty}</span>}</dd>
          </div>
        );
      })}
    </dl>
  );
}
