from __future__ import annotations

import os
from pathlib import Path

import typst

ROOT = Path(__file__).resolve().parents[1]


def main() -> None:
    candidates = [
        Path(os.environ.get("RESUME_FONT_FILE", "/nonexistent")),
        Path("/mnt/c/Windows/Fonts/NanumGothic.ttf"),
        Path("C:/Windows/Fonts/NanumGothic.ttf"),
        Path("/usr/share/fonts/truetype/nanum/NanumGothic.ttf"),
    ]
    font = next((path for path in candidates if path.is_file()), None)
    if font is None:
        raise SystemExit("NanumGothic.ttf의 경로를 RESUME_FONT_FILE로 지정하세요")
    output = ROOT / "public" / "assets" / "pdf"
    output.mkdir(parents=True, exist_ok=True)
    for language in ("ko", "en"):
        target = output / f"resume-{language}.pdf"
        typst.compile(
            str(ROOT / "pdf" / "resume.typ"),
            output=str(target),
            root=str(ROOT),
            font_paths=[str(font.parent)],
            sys_inputs={"lang": language},
        )
        if target.stat().st_size == 0:
            raise RuntimeError(f"PDF가 비어 있습니다: {language}")
        print(f"Built public/assets/pdf/resume-{language}.pdf ({target.stat().st_size:,} bytes)")


if __name__ == "__main__":
    main()
