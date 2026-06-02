# skill-java — Claude Code

**Repositório local de Skills para Desenvolvimento Java**
Todas as skills estao em `skills/` e funcionam localmente sem dependencias externas.

> Instrucoes completas em `AGENTS.md`. Exemplos praticos em `GUIA-SKILLS.md`.

---

## Regras para Claude Code

1. Skills estao em `skills/` — carregue o `SKILL.md` antes de gerar codigo.
2. `code-quality` e `code-readability` sao transversais — aplicar SEMPRE.
3. Consulte `GUIA-SKILLS.md` para exemplos praticos em portugues.
4. Skills sao auto-contidas e nao dependem de fontes externas (Smithery, GitHub).

---

## Skills Disponiveis

| Categoria | Skills |
|-----------|--------|
| Qualidade de Codigo | `code-quality`, `code-readability` |
| Java Core & Padroes | `cui-java-core`, `java-pro` |
| Spring Boot | `java-spring-boot`, `spring-boot-engineer`, `dr-jskill` |
| Arquitetura Enterprise | `java-architect` |
| Microservices | `java-microservices` |
| Verificacao & CI/CD | `springboot-verification` |
| Ferramentas | `smithery-ai-cli` |

---

## Compatibilidade

| Ferramenta | Arquivo de instrucoes | Skills |
|------------|----------------------|--------|
| Claude Code | `CLAUDE.md` (este) | `skills/` |
| OpenCode | `AGENTS.md` | `skills/` |
| VSCode | `.vscode/settings.json` | `skills/` |
