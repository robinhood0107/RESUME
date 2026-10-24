# 박종진 · Portfolio & Resume

Next.js·TypeScript·Tailwind CSS 기반 개인 사이트와 Typst 한국어·영어 PDF입니다.

- Home: `/RESUME/`
- Resume: `/RESUME/resume/`
- Portfolio: `/RESUME/portfolio/`
- 프로젝트 상세: `/RESUME/portfolio/<slug>/`
- PDF: `/RESUME/assets/pdf/resume-ko.pdf`, `/RESUME/assets/pdf/resume-en.pdf`

## 실행

Node.js 22 이상, Python 3.12 이상, uv, NanumGothic 글꼴이 필요합니다.

```bash
npm ci
npm run build:pdf
npm run dev
```

개발 화면은 `http://127.0.0.1:3000/RESUME/`에서 확인합니다. Windows·WSL의 기본 NanumGothic 경로를 찾으며, 다른 위치는 `RESUME_FONT_FILE`로 지정합니다.

## 검사와 빌드

```bash
npm run verify
npm run typecheck
npm run lint
npm run build:all
python3 scripts/check_export.py
```

정적 배포 산출물은 `out/`입니다. GitHub Actions는 한·영 PDF와 사이트를 함께 빌드합니다. `main` push 또는 수동 실행 시 Pages에 배포하며, PR에서는 빌드만 검증합니다.

수정할 데이터와 화면은 [EDITING.md](EDITING.md)에 정리했습니다. 템플릿 출처는 [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md)에 기록했습니다.

정적 빌드 결과는 Windows에서 `python scripts/serve_preview.py`로 실행하면 `http://127.0.0.1:18766/RESUME/`에서 확인할 수 있습니다.
