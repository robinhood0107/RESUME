from __future__ import annotations

import json
import re
from pathlib import Path

import yaml


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "pdf" / "generated"
PDF_SECTION_ORDER = ("skills", "education", "experience", "projects", "external_activities")
FORBIDDEN = re.compile(
    r"(?i)(private-reference|sources_private|[A-Za-z]:\\|/mnt/c/|/home/|"
    r"성적|평점|석차|병역|GPA|class rank|military service|"
    r"\b(?:api[_ -]?key|password|secret)\b)"
)


def markdown_bullets(value: str) -> list[str]:
    return [line.strip()[2:].strip() for line in value.splitlines() if line.strip().startswith("* ")]


def export(label: str, data: dict, email: str, github: str) -> dict:
    sections = []
    rank = {section_id: index for index, section_id in enumerate(PDF_SECTION_ORDER)}
    ordered_sections = sorted(
        data["content"], key=lambda section: rank.get(section["id"], len(rank))
    )
    for section in ordered_sections:
        entries = []
        for item in section["content"]:
            entries.append(
                {
                    "title": item["title"],
                    "subtitle": item.get("sub_title") or "",
                    "caption": item.get("caption") or "",
                    "link": item.get("link") or "",
                    "link_text": item.get("link_text") or "GitHub",
                    "additional_links": [
                        {"title": link["title"], "url": link["url"]}
                        for link in item.get("additional_links") or []
                    ],
                    "bullets": markdown_bullets(item.get("description") or ""),
                }
            )
        sections.append({"title": section["title"], "entries": entries})
    return {
        "language": label,
        "name": data["name"],
        "title": data["title"],
        "email": email,
        "github": github,
        "sections": sections,
    }


def main() -> None:
    site = yaml.safe_load((ROOT / "_config.yml").read_text(encoding="utf-8"))
    order = yaml.safe_load((ROOT / "_data" / "section_order.yml").read_text(encoding="utf-8"))

    def load_language(language: str) -> dict:
        folder = ROOT / "_data" / language
        data = yaml.safe_load((folder / "profile.yml").read_text(encoding="utf-8"))
        data["content"] = []
        for section in order:
            items = yaml.safe_load((folder / f"{section['id']}.yml").read_text(encoding="utf-8"))
            data["content"].append(
                {"id": section["id"], "title": section["title"], "content": items}
            )
        return data

    ko = load_language("ko")
    en = load_language("en")
    if len(ko["content"]) != len(en["content"]):
        raise ValueError("Korean and English section counts differ")
    for left, right in zip(ko["content"], en["content"]):
        if len(left["content"]) != len(right["content"]):
            raise ValueError(f"Entry counts differ in {left['title']}")
        for a, b in zip(left["content"], right["content"]):
            if (a.get("link") or "") != (b.get("link") or ""):
                raise ValueError(f"Links differ at {a['title']}")
            left_extra = [link["url"] for link in a.get("additional_links") or []]
            right_extra = [link["url"] for link in b.get("additional_links") or []]
            if left_extra != right_extra:
                raise ValueError(f"Additional links differ at {a['title']}")
    email = site["email"]
    github = f"https://github.com/{site['github_username']}"
    result = {"ko": export("ko", ko, email, github), "en": export("en", en, email, github)}
    for label, data in result.items():
        source = ko if label == "ko" else en
        if FORBIDDEN.search(json.dumps(source, ensure_ascii=False)):
            raise ValueError(f"Private or excluded information found in {label} source")
        serialized = json.dumps(data, ensure_ascii=False, indent=2)
        if FORBIDDEN.search(serialized):
            raise ValueError(f"Private or excluded information found in {label} resume")
        OUTPUT.mkdir(parents=True, exist_ok=True)
        (OUTPUT / f"resume-{label}.json").write_text(serialized + "\n", encoding="utf-8")
        print(f"{label}: {len(data['sections'])} sections, {sum(len(s['entries']) for s in data['sections'])} entries")


if __name__ == "__main__":
    main()
