#!/usr/bin/env bash
set -euo pipefail

resume_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$resume_root"

font_file="${RESUME_FONT_FILE:-}"
if [[ -z "$font_file" ]]; then
  for candidate in \
    /mnt/c/Windows/Fonts/NanumGothic.ttf \
    /usr/share/fonts/truetype/nanum/NanumGothic.ttf; do
    if [[ -f "$candidate" ]]; then
      font_file="$candidate"
      break
    fi
  done
fi
if [[ ! -f "$font_file" ]]; then
  echo "NanumGothic.ttf not found. Set RESUME_FONT_FILE to its absolute path." >&2
  exit 1
fi

python3 scripts/export_typst_data.py
mkdir -p assets/pdf
for lang in ko en; do
  docker run --rm \
    -v "$resume_root":/data \
    -v "$font_file":/fonts/NanumGothic.ttf:ro \
    -w /data \
    ghcr.io/typst/typst:0.14.2 \
    compile --root /data --font-path /fonts --input "lang=$lang" \
    pdf/resume.typ "assets/pdf/resume-$lang.pdf"
done

docker run --rm \
  -v "$resume_root":/workspace \
  -w /workspace \
  -e BUNDLE_PATH=/workspace/vendor/bundle \
  ruby:3.3 sh -lc 'bundle check || bundle install; bundle exec jekyll build --destination _site'

echo "Built _site/, assets/pdf/resume-ko.pdf, and assets/pdf/resume-en.pdf"
