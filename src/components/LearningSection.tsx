import Link from "next/link";
import SectionHeading from "@/components/SectionHeading";
import learning from "@/data/learning.json";

export default function LearningSection() {
  return (
    <section className="mt-16" aria-label="분야별 학습 기록">
      <SectionHeading>학습 기록</SectionHeading>
      <p className="mb-6 max-w-2xl text-[15px] leading-[1.75] text-muted">
        사용한 기술을 이해하고 다룰 수 있는 범위를 넓히기 위해 남긴 기록입니다.
        수업·강의·개인 연습과 구현 프로젝트를 구분하고, 공개할 수 있는 자료와 관련 사례를 연결했습니다.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {learning.map((group, index) => (
          <details key={group.title} open={index === 0} className="self-start rounded-sm border border-rule px-4 py-4">
            <summary className="cursor-pointer text-[15px] font-semibold">
              {group.title}<span className="ml-2 text-[12px] font-normal text-faint">{group.items.length}개 기록</span>
            </summary>
            <p className="mt-2 text-[13px] leading-[1.7] text-muted">{group.summary}</p>
            <ul className="mt-4 space-y-5">
              {group.items.map((item) => (
                <li key={item.title}>
                  <h3 className="break-keep text-[13.5px] font-semibold">{item.title}</h3>
                  <p className="mt-1 text-[13px] leading-[1.7] text-muted">{item.description}</p>
                  <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-[12.5px]">
                    {item.links.map((link) => (
                      <li key={link.href}>
                        {link.href.startsWith("/") ? (
                          <Link href={link.href} className="text-accent underline underline-offset-4">{link.label} →</Link>
                        ) : (
                          <a href={link.href} target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-4">{link.label} ↗</a>
                        )}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </details>
        ))}
      </div>
    </section>
  );
}
