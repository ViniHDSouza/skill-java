#!/usr/bin/env bash
# install-skills.sh — Interactive installer for skill-java skills
# Run from any directory: bash /path/to/skill-java/install-skills.sh

set -euo pipefail

# Resolve script location to find skills-lock.json and SKILL.md files
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
SKILLS_DIR="$SCRIPT_DIR/skills"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
BOLD='\033[1m'
NC='\033[0m'

declare -A SKILL_SOURCES=(
  ["code-quality"]="code-quality"
  ["code-readability"]="code-readability"
  ["cui-java-core"]="cui-java-core"
  ["smithery-ai-cli"]="smithery-ai-cli"
  ["dr-jskill"]="jdubois/dr-jskill"
  ["java-architect"]="jeffallan/claude-skills/skills/java-architect"
  ["java-microservices"]="pluginagentmarketplace/custom-plugin-java/skills/java-microservices"
  ["java-pro"]="sickn33/antigravity-awesome-skills/skills/java-pro"
  ["java-spring-boot"]="pluginagentmarketplace/custom-plugin-java/skills/java-spring-boot"
  ["spring-boot-engineer"]="jeffallan/claude-skills/skills/spring-boot-engineer"
  ["springboot-verification"]="affaan-m/everything-claude-code/docs/zh-CN/skills/springboot-verification"
)

SKILL_NAMES=(
  "code-quality"
  "code-readability"
  "cui-java-core"
  "smithery-ai-cli"
  "dr-jskill"
  "java-architect"
  "java-microservices"
  "java-pro"
  "java-spring-boot"
  "spring-boot-engineer"
  "springboot-verification"
)

# ── helper: extract description from SKILL.md frontmatter ──
get_desc() {
  local skill="$1"
  local md="$SKILLS_DIR/$skill/SKILL.md"
  if [ -f "$md" ]; then
    sed -n '/^---$/,/^---$/p' "$md" | sed -n 's/^description:\s*//p' | head -1
  else
    echo "(sem descricao)"
  fi
}

# ── helper: format source label ──
source_label() {
  local src="${SKILL_SOURCES[$1]}"
  case "$src" in
    */*)
      echo "GitHub  github.com/$src"
      ;;
    *)
      echo "Smithery.ai (well-known)"
      ;;
  esac
}

# ── print menu ──
print_menu() {
  echo ""
  echo -e "${BOLD}${CYAN}=== skill-java — Instalador de Skills ===${NC}"
  echo ""
  echo -e "${BOLD}Skills disponiveis:${NC}"
  echo ""
  local i=1
  for name in "${SKILL_NAMES[@]}"; do
    local desc
    desc="$(get_desc "$name")"
    local src_label
    src_label="$(source_label "$name")"
    printf "  ${GREEN}%2d${NC}  ${BOLD}%-24s${NC} %s\n" "$i" "$name" "$desc"
    printf "      ${YELLOW}%s${NC}\n" "$src_label"
    ((i++))
  done
  echo ""
  echo -e "  ${BOLD}${GREEN} 0${NC}  ${BOLD}Instalar TODAS${NC}"
  echo ""
}

# ── parse selection ──
parse_selection() {
  local input="$1"
  local -a result=()

  # "0" or "all" -> all skills
  if [ "$input" = "0" ] || [ "$input" = "all" ] || [ "$input" = "ALL" ]; then
    for i in $(seq 1 ${#SKILL_NAMES[@]}); do
      result+=("$i")
    done
    echo "${result[@]}"
    return
  fi

  # split by comma or space
  IFS=', ' read -r -a tokens <<< "$input"

  for token in "${tokens[@]}"; do
    [ -z "$token" ] && continue
    if [[ "$token" =~ ^([0-9]+)-([0-9]+)$ ]]; then
      local start="${BASH_REMATCH[1]}"
      local end="${BASH_REMATCH[2]}"
      if [ "$start" -le "$end" ] && [ "$start" -ge 1 ] && [ "$end" -le "${#SKILL_NAMES[@]}" ]; then
        for j in $(seq "$start" "$end"); do
          result+=("$j")
        done
      else
        echo -e "${RED}Range invalido: $token${NC}" >&2
      fi
    elif [[ "$token" =~ ^[0-9]+$ ]]; then
      if [ "$token" -ge 1 ] && [ "$token" -le "${#SKILL_NAMES[@]}" ]; then
        result+=("$token")
      else
        echo -e "${RED}Numero invalido: $token${NC}" >&2
      fi
    else
      echo -e "${RED}Token ignorado: $token${NC}" >&2
    fi
  done

  echo "${result[@]}"
}

# ── install one skill ──
install_skill() {
  local index="$1"
  local name="${SKILL_NAMES[$((index - 1))]}"
  local source="${SKILL_SOURCES[$name]}"

  echo ""
  echo -ne "${BOLD}[$index/${#SKILL_NAMES[@]}] Instalando ${CYAN}$name${NC}... "

  if npx --yes "@smithery/cli" skills add "$source" --yes 2>&1; then
    echo -e "${GREEN}OK${NC}"
    return 0
  else
    echo -e "${RED}FALHOU${NC}"
    return 1
  fi
}

# ── main ──
main() {
  print_menu

  while true; do
    echo -ne "${BOLD}Selecione (ex: 1-4,7,11 ou 0 para todas): ${NC}"
    read -r selection

    if [ -z "$selection" ]; then
      echo -e "${YELLOW}Entrada vazia. Tente novamente.${NC}"
      continue
    fi

    local -a chosen
    read -r -a chosen <<< "$(parse_selection "$selection")"

    if [ ${#chosen[@]} -eq 0 ]; then
      echo -e "${YELLOW}Nenhuma skill valida selecionada. Tente novamente.${NC}"
      continue
    fi

    # Deduplicate
    local -A seen
    local -a unique
    for idx in "${chosen[@]}"; do
      if [ -z "${seen[$idx]:-}" ]; then
        seen[$idx]=1
        unique+=("$idx")
      fi
    done

    echo ""
    echo -e "${BOLD}Skills selecionadas (${#unique[@]}):${NC}"
    for idx in "${unique[@]}"; do
      echo "  - ${SKILL_NAMES[$((idx - 1))]}"
    done
    echo ""

    echo -ne "${BOLD}Confirmar instalacao? [S/n]: ${NC}"
    read -r confirm
    if [ "$confirm" = "n" ] || [ "$confirm" = "N" ]; then
      echo "Cancelado."
      continue
    fi

    local ok=0
    local fail=0
    local -a failed_names=()

    for idx in "${unique[@]}"; do
      if install_skill "$idx"; then
        ((ok++))
      else
        ((fail++))
        failed_names+=("${SKILL_NAMES[$((idx - 1))]}")
      fi
    done

    echo ""
    echo -e "${BOLD}${CYAN}=== Resumo ===${NC}"
    echo -e "  ${GREEN}Sucesso: $ok${NC}"
    if [ "$fail" -gt 0 ]; then
      echo -e "  ${RED}Falhas:  $fail${NC}"
      for fn in "${failed_names[@]}"; do
        echo -e "    ${RED}- $fn${NC}"
      done
    fi
    break
  done
}

main
