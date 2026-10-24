<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## 프로젝트 명령

- Node.js 22 이상과 Python 3.12 이상을 사용한다.
- `npm run verify`, `npm run typecheck`, `npm run lint`로 검사한다.
- `npm run build:all`로 한·영 Typst PDF와 정적 사이트를 빌드하고 `python3 scripts/check_export.py`로 결과를 확인한다.
- GitHub Pages 경로는 `/RESUME`이다. 페이지 이동은 Next.js Link, 정적 자산은 `assetPath()`를 사용한다.
- 공개 데이터는 `src/data/`, 공개 자산은 `public/`에서 관리한다. 실행 로그와 원본 증거는 Git 제외 `build/validation/`에 둔다.
- Typst 템플릿은 보존하고 웹과 같은 이력서 데이터로 PDF를 만든다.
- 졸업과제는 팀명 대신 프로젝트명으로 표기하고, 제가 맡은 부분과 팀원이 맡은 부분을 구분한다.
