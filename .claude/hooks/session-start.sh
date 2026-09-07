#!/bin/bash
# SessionStart hook: keep the graphify knowledge graph in graphify-out/
# current, so Claude Code can query the graph instead of grepping raw files
# (see the graphify section in CLAUDE.md).
#
# It never installs anything. If the graphify CLI is missing it prints the
# install command and exits. It never fails the session either.
set -uo pipefail

ROOT="${CLAUDE_PROJECT_DIR:-$(pwd)}"
cd "$ROOT" || exit 0

# uv tool / pipx put the graphify binary here.
export PATH="$HOME/.local/bin:$PATH"
if [ -n "${CLAUDE_ENV_FILE:-}" ]; then
  echo 'export PATH="$HOME/.local/bin:$PATH"' >> "$CLAUDE_ENV_FILE"
fi

if ! command -v graphify >/dev/null 2>&1; then
  echo "[graphify hook] graphify CLI not installed; skipping graph build."
  echo "[graphify hook] Install it once with: uv tool install graphifyy"
  exit 0
fi

# Build the graph the first time, then keep it current incrementally.
# --code-only uses the local tree-sitter parser: no API key, nothing leaves
# the machine. Docs/images are skipped (run `graphify .` manually for those).
if [ -f graphify-out/graph.json ]; then
  echo "[graphify hook] updating knowledge graph..."
  graphify update . >/dev/null 2>&1 || echo "[graphify hook] graphify update failed (graph left as-is)"
else
  echo "[graphify hook] building knowledge graph (code only)..."
  if graphify . --code-only >/dev/null 2>&1; then
    graphify cluster-only . >/dev/null 2>&1 || true
  else
    echo "[graphify hook] graph build failed; run 'graphify . --code-only' manually to see the error"
  fi
fi

if [ -f graphify-out/graph.json ]; then
  echo "[graphify hook] graph ready at graphify-out/ ($(graphify --version 2>/dev/null))"
fi

exit 0
