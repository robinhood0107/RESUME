from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "src" / "data" / "resume.json"
OUTPUT = ROOT / "pdf" / "generated"
PDF_SECTION_ORDER = ("skills", "education", "experience", "projects", "external_activities")
FORBIDDEN = re.compile(
    r"(?i)(private-reference|sources_private|[A-Za-z]:\\|/mnt/c/|/home/|"
    r"성적|평점|석차|병역|GPA|class rank|military service|"
    r"\b(?:api[_ -]?key|password|secret)\b)"
)


def export_data(source: dict) -> dict:
    if FORBIDDEN.search(json.dumps(source, ensure_ascii=False)):
        raise ValueError("비공개 또는 제외 대상 정보가 이력서에 포함되어 있습니다")
    ko, en = source["ko"], source["en"]
    if [s["id"] for s in ko["sections"]] != [s["id"] for s in en["sections"]]:
        raise ValueError("한국어와 영어 섹션이 다릅니다")
    for left, right in zip(ko["sections"], en["sections"]):
        if len(left["entries"]) != len(right["entries"]):
            raise ValueError(f"항목 수가 다릅니다: {left['id']}")
        for a, b in zip(left["entries"], right["entries"]):
            left_links = [link["url"] for link in a["additional_links"]]
            right_links = [link["url"] for link in b["additional_links"]]
            if a["link"] != b["link"] or left_links != right_links:
                raise ValueError(f"한영 링크가 다릅니다: {a['title']}")
    rank = {name: i for i, name in enumerate(PDF_SECTION_ORDER)}
    result = {}
    for language in ("ko", "en"):
        data = source[language]
        sections = sorted(data["sections"], key=lambda section: rank[section["id"]])
        result[language] = {
            key: data[key] for key in ("language", "name", "title", "email", "github")
        }
        result[language]["sections"] = [
            {"title": section["title"], "entries": section["entries"]}
            for section in sections
        ]
    return result


def main() -> None:
    result = export_data(json.loads(SOURCE.read_text(encoding="utf-8")))
    OUTPUT.mkdir(parents=True, exist_ok=True)
    for language, data in result.items():
        path = OUTPUT / f"resume-{language}.json"
        path.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
        print(f"{language}: {len(data['sections'])} sections, {sum(len(s['entries']) for s in data['sections'])} entries")


if __name__ == "__main__":
    main()
