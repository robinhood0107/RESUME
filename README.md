# Resume

한국어·영어 웹 이력서와 Typst PDF입니다. 웹 화면은 [modern-resume-theme](https://github.com/sproogen/modern-resume-theme)를 사용합니다.

- [한국어 이력서](https://robinhood0107.github.io/RESUME/)
- [English resume](https://robinhood0107.github.io/RESUME/en/)
- [한국어 PDF](https://robinhood0107.github.io/RESUME/assets/pdf/resume-ko.pdf) · [English PDF](https://robinhood0107.github.io/RESUME/assets/pdf/resume-en.pdf)

## 로컬 빌드

WSL 또는 Linux에서 Python 3, PyYAML, Docker가 필요합니다.

```bash
bash scripts/build_local.sh
```

빌드 결과는 `_site/`에 생성됩니다. PDF 보기·인쇄와 다운로드 버튼은 모두 Typst로 만든 같은 PDF를 사용합니다.

## 문구 수정

[EDITING.md](EDITING.md)에 수정할 파일과 빌드 방법을 정리했습니다.
