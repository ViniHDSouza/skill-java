# skill-java — Claude Code

**Repositorio de Skills para Desenvolvimento Java**
Skills organizadas em buckets dentro de `skills/`. Instale todas ou escolha por bucket/skill.

> Instrucoes completas em `AGENTS.md`. Exemplos praticos em `GUIA-SKILLS.md`.

---

## Regras para Claude Code

1. Skills estao em `skills/<bucket>/<skill>/` — carregue o `SKILL.md` antes de gerar codigo.
2. `code-quality` e `code-readability` sao transversais — aplicar SEMPRE.
3. Consulte `GUIA-SKILLS.md` para exemplos praticos em portugues.
4. Skills sao auto-contidas e nao dependem de fontes externas.
5. Use `bash scripts/postinstall.sh` para gerar symlinks em `.claude/skills/`.

---

## Skills Disponiveis

| Bucket | Skills |
|--------|--------|
| `core/` | `code-quality`, `code-readability` |
| `java/` | `cui-java-core`, `java-pro` |
| `spring-boot/` | `dr-jskill`, `java-spring-boot`, `spring-boot-engineer` |
| `architecture/` | `java-architect`, `java-microservices` |
| `verification/` | `springboot-verification` |
| `tools/` | `smithery-ai-cli` |

---

## Instalacao

```bash
# Todas as skills
npx skills add https://github.com/ViniHDSouza/skill-java

# Um bucket especifico
npx skills add ViniHDSouza/skill-java/skills/spring-boot

# Uma skill especifica
npx skills add ViniHDSouza/skill-java/skills/spring-boot --skill dr-jskill
```

---

## Compatibilidade

| Ferramenta | Arquivo de instrucoes | Skills |
|------------|----------------------|--------|
| Claude Code | `CLAUDE.md` (este) | `skills/` |
| OpenCode | `AGENTS.md` | `skills/` |
| VSCode | `.vscode/settings.json` | `skills/` |
