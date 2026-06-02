# skill-java

[![skills.sh](https://skills.sh/b/ViniHDSouza/skill-java)](https://skills.sh/ViniHDSouza/skill-java)

A curated collection of **11 agent skills** for Java development — covering code quality, Spring Boot, microservices, enterprise architecture, and CI/CD verification. Each skill provides domain-specific knowledge, best practices, and guided workflows that enhance an agent's ability to perform specialized Java tasks.

## Installation

### Quick install (recommended)

Install all skills into your agent skills directory with the [`skills`](https://www.npmjs.com/package/skills) CLI:

```bash
npx skills add https://github.com/ViniHDSouza/skill-java
```

### Install a single bucket

Use the `owner/repo/<subpath>` shorthand to install only one bucket:

```bash
# Only Spring Boot skills
npx skills add ViniHDSouza/skill-java/skills/spring-boot

# Only architecture skills
npx skills add ViniHDSouza/skill-java/skills/architecture

# Only core quality skills
npx skills add ViniHDSouza/skill-java/skills/core
```

You can also pin a specific skill with `--skill`:

```bash
npx skills add ViniHDSouza/skill-java/skills/spring-boot --skill dr-jskill
```

### Manual install

Copy or symlink the skills you need into your Claude Code configuration:

```bash
# Copy a single skill
cp -r skills/spring-boot/dr-jskill ~/.claude/skills/dr-jskill

# Or symlink an entire bucket
ln -s $(pwd)/skills/spring-boot ~/.claude/skills/spring-boot
```

### Local development (symlinks)

After cloning, run the postinstall script to symlink all skills into `.claude/skills/` and `.agents/skills/`:

```bash
git clone https://github.com/ViniHDSouza/skill-java.git
cd skill-java
bash scripts/postinstall.sh
```

## Usage

Skills are automatically picked up by Claude Code when placed in the `~/.claude/skills/` directory. The agent matches tasks to relevant skills based on the `description` field in each `SKILL.md` frontmatter.

### Quick start by workflow

| When you need to... | Install these skills |
|---|---|
| **Create a new Spring Boot project** | `dr-jskill` |
| **Build REST APIs** | `java-spring-boot` + `code-quality` + `code-readability` |
| **Enterprise/advanced Spring Boot** | `spring-boot-engineer` + `java-architect` |
| **Microservices with resilience** | `java-microservices` + `java-architect` |
| **Verify before PR/deploy** | `springboot-verification` |
| **Modern Java 21+ features** | `java-pro` |
| **CUI project Java development** | `cui-java-core` + `code-quality` |

### Compatibility

| Agent | Instructions | Skills |
|---|---|---|
| **Claude Code** | `CLAUDE.md` | `skills/` (via `scripts/postinstall.sh`) |
| **OpenCode** | `AGENTS.md` | `skills/` (via `scripts/postinstall.sh`) |
| **VS Code** | `.vscode/settings.json` | `skills/` (via AI extensions) |

## Skill Catalog

### Core — Code Quality

Cross-cutting skills for code quality and readability. Apply to any code change.

- **[code-quality](./skills/core/code-quality)** — Code quality guidelines — apply to ANY code change
- **[code-readability](./skills/core/code-readability)** — Clean, self-documenting, maintainable code

### Java — Core & Patterns

Core Java patterns, null safety, Lombok, modern features (Java 21+), and logging.

- **[cui-java-core](./skills/java/cui-java-core)** — CUI coding patterns, null safety, Lombok, logging
- **[java-pro](./skills/java/java-pro)** — Java 21+ modern features, virtual threads, GraalVM

### Spring Boot

REST APIs, Security, Data JPA, Actuator, project generation, and advanced 3.x patterns.

- **[dr-jskill](./skills/spring-boot/dr-jskill)** — Project generator — full-stack apps with Vue/React/Angular
- **[java-spring-boot](./skills/spring-boot/java-spring-boot)** — REST APIs, Security, Data, Actuator
- **[spring-boot-engineer](./skills/spring-boot/spring-boot-engineer)** — Advanced Spring Boot 3.x with WebFlux, JPA, Security 6

### Architecture

Enterprise architecture, DDD, reactive WebFlux, microservices, and cloud-native design.

- **[java-architect](./skills/architecture/java-architect)** — Enterprise design, DDD, reactive, cloud-native
- **[java-microservices](./skills/architecture/java-microservices)** — Spring Cloud, resilience, Kafka, observability

### Verification — CI/CD

Build verification, static analysis, test coverage, and security scans before PR.

- **[springboot-verification](./skills/verification/springboot-verification)** — Build, tests, static analysis, security scans

### Tools

MCP tool discovery and connection.

- **[smithery-ai-cli](./skills/tools/smithery-ai-cli)** — Find and connect MCP tools via Smithery CLI

## Structure

```
skills/
  core/<skill-name>/           # Cross-cutting quality skills
  java/<skill-name>/           # Java Core & Patterns
  spring-boot/<skill-name>/    # Spring Boot ecosystem
  architecture/<skill-name>/   # Enterprise architecture & microservices
  verification/<skill-name>/   # CI/CD & verification
  tools/<skill-name>/          # Developer tools

skills/<bucket>/<skill-name>/
  SKILL.md              # Main skill definition (required)
  references/           # Deep-dive reference material
  standards/            # Coding standards and patterns
  assets/               # Templates and configuration files
  scripts/              # Automation scripts and validators
```

## Contributing

To add a new skill:

1. Create a directory under the appropriate bucket with a lowercase, hyphenated name
2. Add a `SKILL.md` with proper frontmatter (`name` and `description` fields)
3. Include reference material, examples, and templates as needed
4. Run `bash scripts/postinstall.sh` to symlink the new skill

## License

MIT
