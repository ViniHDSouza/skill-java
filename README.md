# skill-java

[![skills.sh](https://skills.sh/b/ViniHDSouza/skill-java)](https://skills.sh/ViniHDSouza/skill-java)

**Agent Skills for Java Development** — Spring Boot, Microservices, Enterprise Architecture

Collection of 11 AI agent skills covering the Java ecosystem: code quality, Spring Boot 3.x, microservices, JPA, security, reactive programming, testing, and CI/CD verification.

## Install

### Via CLI Interativa (recomendado)

O comando `npx skills add ViniHDSouza/skill-java` abre um menu interativo para selecionar uma ou mais skills.

```bash
# 1. Instale a CLI globalmente
npm install -g github:ViniHDSouza/skill-java

# 2. Execute em qualquer projeto
skills add ViniHDSouza/skill-java
```

> **Nota:** O primeiro comando (`npm install -g`) instala o binário `skills`. Isso precisa ser feito apenas uma vez. Depois, em qualquer projeto, é só rodar `skills add ViniHDSouza/skill-java` para abrir o seletor interativo.

**Desenvolvimento local (sem publicar):**

```bash
git clone https://github.com/ViniHDSouza/skill-java.git
cd skill-java
npm install && npm run build
npm link

# Agora o comando funciona globalmente:
skills add ViniHDSouza/skill-java
```

### Via install-skills.sh (bash)

```bash
git clone https://github.com/ViniHDSouza/skill-java.git
cd skill-java
bash install-skills.sh
# Menu interativo — escolha uma, varias ou todas (digite 0)
```

### Via npx skills (manual, uma por uma)

```bash
# Well-known skills (Smithery.ai)
npx skills add code-quality
npx skills add code-readability
npx skills add cui-java-core
npx skills add smithery-ai-cli

# GitHub skills
npx skills add jdubois/dr-jskill
npx skills add jeffallan/claude-skills/skills/java-architect
npx skills add jeffallan/claude-skills/skills/spring-boot-engineer
npx skills add pluginagentmarketplace/custom-plugin-java/skills/java-microservices
npx skills add pluginagentmarketplace/custom-plugin-java/skills/java-spring-boot
npx skills add sickn33/antigravity-awesome-skills/skills/java-pro
npx skills add affaan-m/everything-claude-code/docs/zh-CN/skills/springboot-verification
```

### Via clone (local use, no Smithery CLI needed)

```bash
git clone https://github.com/ViniHDSouza/skill-java.git
cd skill-java
# Skills are ready in skills/ — OpenCode picks them up automatically
```

## Usage

### Quick start by workflow

| When you need to... | Install these skills |
|---|---|
| **Create a new Spring Boot project** | `dr-jskill` |
| **Build REST APIs** | `java-spring-boot` + `code-quality` + `code-readability` |
| **Enterprise/advanced Spring Boot** | `spring-boot-engineer` + `java-architect` |
| **Microservices with resilience** | `java-microservices` + `java-architect` |
| **Secure your APIs** | `java-spring-boot` + `spring-boot-engineer` |
| **Verify before PR/deploy** | `springboot-verification` |
| **CUI project Java development** | `cui-java-core` + `code-quality` |
| **Modern Java 21+ features** | `java-pro` |

### With AI agents

Once installed, the agent loads the skill automatically when the task matches the skill description.

- **Claude Code**: Skills in `skills/` are loaded when `CLAUDE.md` is present in the project root.
- **OpenCode**: Configured via `.opencode/opencode.jsonc` pointing to `skills/`.
- **VS Code (Copilot/Cline/Continue)**: Use `.vscode/settings.json` and the AI extension's skill directory setting.

### Managing skills

```bash
# List installed skills
npx skills list

# Install more skills later — re-run the interactive script
bash install-skills.sh
```

## Skills

| Skill | Category | Description |
|---|---|---|
| `code-quality` | Code Quality | Code quality guidelines — apply to any code change |
| `code-readability` | Code Quality | Clean, self-documenting, maintainable code |
| `cui-java-core` | Java Core | CUI coding patterns, null safety, Lombok, logging |
| `java-pro` | Java Core | Java 21+ modern features, virtual threads, GraalVM |
| `dr-jskill` | Spring Boot | Project generator — full-stack apps with Vue/React/Angular |
| `java-spring-boot` | Spring Boot | REST APIs, Security, Data, Actuator |
| `spring-boot-engineer` | Spring Boot | Advanced Spring Boot 3.x with WebFlux, JPA, Security 6 |
| `java-architect` | Architecture | Enterprise design, DDD, reactive, cloud-native |
| `java-microservices` | Microservices | Spring Cloud, resilience, Kafka, observability |
| `springboot-verification` | CI/CD | Build, tests, static analysis, security scans |
| `smithery-ai-cli` | Tools | Find and connect MCP tools via Smithery CLI |

## Compatibility

| Agent | Instructions | Skills Path |
|---|---|---|
| **Claude Code** | `CLAUDE.md` | `skills/` |
| **OpenCode** | `AGENTS.md` | `skills/` |
| **VS Code** | `.vscode/settings.json` | `skills/` (via AI extensions) |

## Repository Structure

```
skills/                  # 11 skill directories (SKILL.md + references)
├── code-quality/
├── code-readability/
├── cui-java-core/       # + standards/
├── dr-jskill/           # + scripts/, references/, assets/, workshop/
├── java-architect/      # + references/
├── java-microservices/  # + references/, assets/, scripts/
├── java-pro/
├── java-spring-boot/    # + references/, assets/, scripts/
├── smithery-ai-cli/
├── spring-boot-engineer/ # + references/
└── springboot-verification/
AGENTS.md                # Full skill catalog and usage rules
CLAUDE.md                # Claude Code instructions
GUIA-SKILLS.md           # Practical guide (Portuguese)
install-skills.sh        # Interactive skill installer
skills-lock.json         # Source tracking and integrity hashes
skills.sh.json           # skills.sh listing customization
```

## License

MIT
