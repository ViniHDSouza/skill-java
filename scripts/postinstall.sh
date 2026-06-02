#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
SOURCE_DIR="$ROOT_DIR/skills"

TARGET_DIRS=(
  "$ROOT_DIR/.claude/skills"
  "$ROOT_DIR/.agents/skills"
)

CATEGORIES=(
  "core"
  "java"
  "spring-boot"
  "architecture"
  "verification"
  "tools"
)

if [ ! -d "$SOURCE_DIR" ]; then
  echo "No skills/ directory found at $SOURCE_DIR, skipping skill symlink."
  exit 0
fi

for target_dir in "${TARGET_DIRS[@]}"; do
  mkdir -p "$target_dir"

  removed_stale=0
  for link in "$target_dir"/*; do
    [ -L "$link" ] || continue
    if [ ! -e "$link" ]; then
      rm "$link"
      removed_stale=$((removed_stale + 1))
    fi
  done

  linked=0
  for category in "${CATEGORIES[@]}"; do
    category_dir="$SOURCE_DIR/$category"
    [ -d "$category_dir" ] || continue

    for skill in "$category_dir"/*/; do
      [ -d "$skill" ] || continue
      skill_name="$(basename "$skill")"
      target="$target_dir/$skill_name"

      if [ -L "$target" ] || [ -e "$target" ]; then
        rm -rf "$target"
      fi

      ln -s "../../skills/$category/$skill_name" "$target"
      linked=$((linked + 1))
    done
  done

  rel_target="${target_dir#$ROOT_DIR/}"
  echo "Linked $linked skills from skills/{${CATEGORIES[*]}} → $rel_target (removed $removed_stale stale link(s))"
done
