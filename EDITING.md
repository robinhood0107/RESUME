# 수정 안내

## 이력서와 PDF

`src/data/resume.json`의 `ko`, `en`에 공개 이력서 데이터를 함께 관리합니다. 프로젝트·활동 링크와 항목 수는 두 언어가 일치해야 합니다. 웹 이력서는 이 데이터에서 내용을 읽고, `scripts/export_typst_data.py`가 같은 내용을 Typst JSON으로 변환합니다.

PDF 서식은 `pdf/resume.typ`에서 수정합니다. 기존 Typst의 한·영 생성 기능과 섹션 순서를 유지합니다. 웹과 PDF는 전체 프로젝트를 담으며, 웹의 상세 연결은 프로젝트의 GitHub 주소로 찾습니다.

```bash
npm run build:pdf
```

## 포트폴리오

`src/data/case-studies.json`에 각 프로젝트의 개요·역할·문제·구조·해결 과정·결과를 관리합니다. `src/data/caseStudies.ts`의 기존 블록 타입을 따릅니다. 프로젝트를 추가하면 목록과 상세 정적 경로가 함께 생성됩니다.

이미지는 `public/images/<slug>/` 또는 `public/portfolio-media/<slug>/`에 둡니다. 실제 크기와 캡션을 데이터에 기록하며, 기존 캡처와 새 실행 캡처의 출처를 구분합니다. 홈 소개와 연락처는 `src/data/profile.ts`에서 수정합니다.

각 프로젝트의 `architecture.svg`는 README·현재 코드에 근거한 구조도입니다. 모듈과 연결을 바꿀 때 `Product`, `System Architecture`, `Development`, `Results`도 함께 대조합니다. 원본 이미지는 새 탭으로 열 수 있으며, `references` 블록에는 HTTPS 근거 링크를 둡니다.

상세 본문은 Overview, Problem, Product, System Architecture, Design Decisions, Development, Results 순서로 설명합니다. Design Decisions의 cards 블록에는 구조를 이렇게 나눈 이유와 해결하려는 문제를 적습니다. 팀 전체 설계와 본인 담당을 구분하고, 수치에는 입력과 조건 및 재현 범위를 붙입니다.

목록은 기존 구성처럼 프로젝트 정보, Overview 소개 문장, Results의 첫 결과 설명과 최대 네 개의 수치를 그대로 보여줍니다. 결과 설명과 수치를 대표 이미지보다 먼저 표시해 상세 페이지에 들어가기 전에도 읽을 수 있게 합니다. 대표 이미지는 한 장, 상세 페이지로 가는 링크는 하나만 둡니다. 상세 페이지에는 문제 정의부터 결과, 데모와 소스 코드 링크, 기존 설명과 아키텍처 및 설계 이유까지 모두 표시합니다.

상세 페이지의 사진과 동영상은 프로그램 소개 바로 뒤에 배치합니다. 영상이 있는 프로젝트는 demo 링크를 상세 페이지의 #demo로 연결합니다. 발표 자료를 데모로 표시하지 않으며, 공개 데모나 소스 링크가 없으면 그 상태를 안내합니다. 구조도는 #architecture에서 확인하고 원본도 열 수 있습니다. 캡처 설명에는 날짜를 붙이지 않습니다.

사이트 이름은 `src/data/profile.ts`의 `SITE_NAME`에서 관리합니다. 개인 이름과 별도로 브라우저 제목과 공유 메타데이터에 사용합니다.

학습 분류 자료는 `src/data/learning.json`에서 관리합니다. 제공된 강의·수업 연습과 직접 구현한 제품을 구분하고, 공개 저장소만 외부 링크로 연결합니다. 비공개 학습·운영 기록은 설명 또는 관련 내부 사례로 연결합니다.

AI 활용 수준은 사용자 확인과 저장소 근거에 맞춰 씁니다. 졸업과제는 적극 활용, 미국주식 모의투자는 설계·프로토타입 활용, Net Zero는 직접 구축한 범위로 구분합니다. 사용한 기술과 변경 내용을 이해·통제하려는 방식, 검증·커밋·PR 승인 주체를 과장 없이 적습니다.

## 배포 경로

`next.config.ts`와 `src/data/profile.ts`의 `/RESUME`은 동일해야 합니다. 내부 페이지 이동에는 Next.js `Link`를 사용하고, 정적 이미지와 PDF 주소에는 `assetPath()`를 사용합니다.

`npm run build`는 정적 내보내기 뒤 `scripts/normalize_export_paths.mjs`를 실행합니다. Windows에서 폴더로 생성된 Next.js prefetch 경로를 브라우저가 요청하는 파일명으로 복사하며, 이미 올바른 경로로 생성된 파일은 그대로 둡니다.

## 검증

```bash
npm run verify
npm run typecheck
npm run lint
npm run build:all
python3 scripts/check_export.py
```

스크린샷이나 성능 수치를 추가할 때는 실행 버전·입력·측정 범위를 확인합니다. 개인 역할과 팀 전체 결과를 구분합니다. 비공개 원본·키·로컬 실행 로그는 공개 데이터와 `public/`에 넣지 않습니다.
