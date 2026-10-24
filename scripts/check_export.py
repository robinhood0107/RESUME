from __future__ import annotations

import json
import re
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "out"
BASE = "/RESUME"


class References(HTMLParser):
    def __init__(self):
        super().__init__()
        self.paths = []

    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key in ("src", "href") and value:
                self.paths.append(value)


def main() -> None:
    studies = json.loads((ROOT / "src/data/case-studies.json").read_text())
    routes = ["", "resume", "portfolio", *[f"portfolio/{s['slug']}" for s in studies]]
    for route in routes:
        assert (OUTPUT / route / "index.html").is_file(), route
    failures = []
    for page in OUTPUT.rglob("*.html"):
        text = page.read_text(encoding="utf-8")
        assert not re.search(r"mark77234|Byeongchan|이병찬|DailyOPIc|KillingPart|\bMARS\b", text, re.I), page
        parser = References()
        parser.feed(text)
        for ref in parser.paths:
            url = urlparse(ref)
            if url.scheme or url.netloc or not url.path:
                continue
            path = unquote(url.path)
            if path.startswith("/"):
                if path != BASE and not path.startswith(BASE + "/"):
                    failures.append(f"{page.relative_to(OUTPUT)}: basePath 누락 {path}")
                    continue
                target = OUTPUT / path.removeprefix(BASE).lstrip("/")
            else:
                target = page.parent / path
            if target.is_dir():
                target = target / "index.html"
            if not target.is_file():
                failures.append(f"{page.relative_to(OUTPUT)}: 파일 없음 {ref}")
    if failures:
        raise SystemExit("\n".join(sorted(set(failures))))
    for language in ("ko", "en"):
        assert (OUTPUT / f"assets/pdf/resume-{language}.pdf").stat().st_size > 0
    english_entry = (OUTPUT / "en/index.html").read_text(encoding="utf-8")
    assert 'content="0; url=/RESUME/assets/pdf/resume-en.pdf"' in english_entry
    print(f"정적 페이지 {len(routes)}개와 모든 내부 링크·자산·PDF 확인 완료")


if __name__ == "__main__":
    main()
