# 수정 안내

## 이력서와 PDF

`src/data/resume.json`의 `ko`, `en`에 공개 이력서 데이터를 함께 관리합니다. 프로젝트·활동 링크와 항목 수는 두 언어가 일치해야 합니다. 웹 이력서는 이 데이터에서 내용을 읽고, `scripts/export_typst_data.py`가 같은 내용을 Typst JSON으로 변환합니다.

PDF 서식은 `pdf/resume.typ`에서 수정합니다. 기존 Typst의 한·영 생성 기능과 섹션 순서를 유지합니다. 웹은 대표 프로젝트 4개, PDF는 전체 프로젝트를 담습니다.

```bash
npm run build:pdf
```

## 포트폴리오

`src/data/case-studies.json`에 각 프로젝트의 개요·역할·문제·구조·해결 과정·결과를 관리합니다. `src/data/caseStudies.ts`의 기존 블록 타입을 따릅니다. 프로젝트를 추가하면 목록과 상세 정적 경로가 함께 생성됩니다.

이미지는 `public/images/<slug>/`에 둡니다. 실제 크기와 캡션을 데이터에 기록하며, 기존 캡처와 새 실행 캡처의 출처를 구분합니다. 홈 소개와 연락처는 `src/data/profile.ts`에서 수정합니다.

## 배포 경로

`next.config.ts`와 `src/data/profile.ts`의 `/RESUME`은 동일해야 합니다. 내부 페이지 이동에는 Next.js `Link`를 사용하고, 정적 이미지와 PDF 주소에는 `assetPath()`를 사용합니다.

## 검증

```bash
npm run verify
npm run typecheck
npm run lint
npm run build:all
python3 scripts/check_export.py
```

스크린샷이나 성능 수치를 추가할 때는 실행 버전·입력·측정 범위를 확인합니다. 개인 역할과 팀 전체 결과를 구분합니다. 비공개 원본·키·로컬 실행 로그는 공개 데이터와 `public/`에 넣지 않습니다.
