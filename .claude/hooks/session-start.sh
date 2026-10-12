#!/bin/bash
# Instala as dependências ao abrir uma sessão do Claude Code na nuvem.
set -euo pipefail

if [ "${CLAUDE_CODE_REMOTE:-}" != "true" ]; then
  exit 0
fi

cd "$CLAUDE_PROJECT_DIR"

# O Playwright já tem Chromium na imagem da nuvem; não baixar de novo.
export PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1

if [ ! -d node_modules ] || [ package-lock.json -nt node_modules/.package-lock.json ]; then
  npm ci --no-audit --no-fund
fi

# Pastas que o app espera e que o Git não guarda.
mkdir -p data logs temp uploads
