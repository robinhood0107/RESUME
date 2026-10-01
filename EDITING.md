# 이력서 문구 수정

웹과 PDF는 `_data/ko/`, `_data/en/`의 YAML을 함께 사용합니다. 생성된 `_site/`, `pdf/generated/`, `assets/pdf/` 파일은 직접 수정하지 않습니다.

| 수정할 내용 | 한국어 | 영어 |
| --- | --- | --- |
| 이름·소개 | `_data/ko/profile.yml` | `_data/en/profile.yml` |
| 기술 | `_data/ko/skills.yml` | `_data/en/skills.yml` |
| 운영·프로젝트 경험 | `_data/ko/experience.yml` | `_data/en/experience.yml` |
| 프로젝트 | `_data/ko/projects.yml` | `_data/en/projects.yml` |
| 활동·학력 | `_data/ko/external_activities.yml`, `_data/ko/education.yml` | `_data/en/external_activities.yml`, `_data/en/education.yml` |

항목의 제목·역할·기간·링크는 `title`, `sub_title`, `caption`, `link`를 수정합니다. 설명은 `description: |` 아래의 `* `로 시작하는 줄을 고칩니다. 두 언어에서 항목 순서와 링크를 맞춥니다. 섹션 순서는 `_data/section_order.yml`, 공개 이메일·GitHub 계정·사진 경로는 `_config.yml`에 있습니다.

새 항목은 코드·보고서·시연 등 근거를 확인한 뒤 같은 위치에 한국어·영어로 추가합니다. 확인되지 않은 경력이나 수치는 넣지 않습니다.

## 확인과 미리보기

```bash
bash scripts/build_local.sh
```

이 명령은 양 언어 데이터를 검사하고 Typst PDF와 Jekyll 사이트를 생성합니다. NanumGothic.ttf가 기본 위치에 없다면 `RESUME_FONT_FILE=/absolute/path/NanumGothic.ttf bash scripts/build_local.sh`로 지정합니다. GitHub Pages에서는 `.github/workflows/pages.yml`이 같은 작업을 수행합니다.

현재 로컬 미리보기와 같은 경로로 열려면 다음 명령을 별도 터미널에서 실행합니다.

```bash
mkdir -p /tmp/resume-preview
ln -sfn "$PWD/_site" /tmp/resume-preview/RESUME
python3 -m http.server 8766 --bind 127.0.0.1 --directory /tmp/resume-preview
```

브라우저 주소는 `http://127.0.0.1:8766/RESUME/`입니다. PDF는 A4 형식이며 글꼴을 파일 안에 포함합니다. 웹 소개 문단은 PDF에 싣지 않고, 기술·학력·경험·프로젝트·활동만 사용합니다. PDF 배치 자체를 바꿀 때만 `pdf/resume.typ`을 수정합니다.

## 공개 범위

공개용 이름·이메일·가공한 사진 사본만 사이트에 둡니다. 사진 원본, 증빙 원본, 계정·서버 정보와 검수 자료는 저장소에 추가하지 않습니다. 내부 검수 자료는 Git에서 제외되는 `_private_research/`에 둡니다.
