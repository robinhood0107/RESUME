#!/usr/bin/env bash
set -euo pipefail

resume_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$resume_root"
python3 scripts/export_typst_data.py
uv run --no-project --with typst==0.14.2 python scripts/build_pdfs.py
npm run build
