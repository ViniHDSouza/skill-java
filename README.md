# skill-java

[![skills.sh](https://skills.sh/b/ViniHDSouza/skill-java)](https://skills.sh/ViniHDSouza/skill-java)

**Agent Skills for Java Development** — Spring Boot, Microservices, Enterprise Architecture

Collection of 11 AI agent skills covering the Java ecosystem: code quality, Spring Boot 3.x, microservices, JPA, security, reactive programming, testing, and CI/CD verification.

## Install

### Via `npx skills` (recommended)

```bash
# Install all 11 skills at once
npx skills add ViniHDSouza/skill-java

# Install only specific skills
npx skills add ViniHDSouza/skill-java --skill code-quality
npx skills add ViniHDSouza/skill-java --skill java-spring-boot
npx skills add ViniHDSouza/skill-java --skill spring-boot-engineer

# Install multiple skills in one command (repeat --skill)
npx skills add ViniHDSouza/skill-java \
  --skill code-quality \
  --skill cui-java-core \
  --skill java-spring-boot

# Remove all skills from this repo
npx skills remove ViniHDSouza/skill-java
```

### Via clone (local use)

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

# Update a skill to the latest version
npx skills update ViniHDSouza/skill-java --skill java-spring-boot

# Remove all skills from this repo
npx skills remove ViniHDSouza/skill-java
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
skills-lock.json         # Source tracking and integrity hashes
skills.sh.json           # skills.sh listing customization
```

## License

MIT
