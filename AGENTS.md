# skill-java

**Repositório de Skills para Desenvolvimento Java**
Fonte: [github.com/ViniHDSouza/skill-java](https://github.com/ViniHDSouza/skill-java)

> **Nota:**
> Este documento é destinado a agentes de IA e LLMs para orientar a seleção e
> aplicação correta das skills ao manter, gerar ou refatorar codebases Java.
> Humanos também podem utilizá-lo como referência rápida.

---

## Visão Geral

Este repositório contém uma coleção de skills para desenvolvimento Java, focado principalmente no ecossistema Spring Boot e arquitetura enterprise. As skills estão organizadas no diretório `skills/`.

Cada skill possui um `SKILL.md` como ponto de entrada e, opcionalmente, diretórios `references/`, `standards/`, `assets/`, `scripts/` e `workshop/` com conteúdo complementar.

---

## Índice de Skills

### Categorias

| Categoria | Skills |
|-----------|--------|
| **Qualidade de Código** | `code-quality`, `code-readability` |
| **Java Core & Padrões** | `cui-java-core`, `java-pro` |
| **Spring Boot** | `java-spring-boot`, `spring-boot-engineer`, `dr-jskill` |
| **Arquitetura Enterprise** | `java-architect` |
| **Microservices** | `java-microservices` |
| **Verificação & CI/CD** | `springboot-verification` |
| **Ferramentas** | `smithery-ai-cli` |

---

## Mapa de Skills

### code-quality
- **Descrição:** Diretrizes de qualidade de código. Aplicar SEMPRE em qualquer mudança de código.
- **Quando usar:** Em qualquer alteração de código — é uma skill transversal obrigatória.
- **Regras-chave:**
  - Não escrever código permissivo (evitar Union Types, sem try/catch defensivo)
  - Não usar abreviações ou acrônimos (usar `number` em vez de `num`)
  - Preferir editar arquivo existente a criar novo
  - Usar preconditions e schema libraries para validação
  - Emoji e unicode são bem-vindos em comentários e headers
- **Fonte:** Smithery.ai

### code-readability
- **Descrição:** Escrita de código limpo, compreensível e auto-documentado, fácil de revisar e manter.
- **Quando usar:** Em qualquer desenvolvimento de código — complementa `code-quality`.
- **Regras-chave:**
  - Nomes descritivos (`getUserProfile()` em vez de `getData()`)
  - Clareza sobre esperteza (código explícito > código "clever")
  - Estrutura simples e organizada para reduzir carga cognitiva
- **Fonte:** Smithery.ai

### cui-java-core
- **Descrição:** Padrões de desenvolvimento Java para projetos CUI — coding patterns, null safety, Lombok, features modernas do Java e framework de logging CUI.
- **Quando usar:** Em qualquer desenvolvimento Java em projetos CUI. Carregar TODOS os standards fundamentais antes de escrever código.
- **Standards obrigatórios (sempre carregar):**
  - `standards/java-core-patterns.md` — organização de código, naming, exceptions, imutabilidade
  - `standards/java-null-safety.md` — @NullMarked, Optional, null checks em API boundaries
  - `standards/java-lombok-patterns.md` — @Delegate, @Builder, @Value, @UtilityClass
  - `standards/java-modern-features.md` — Records, switch expressions, streams, text blocks, pattern matching
  - `standards/logging-standards.md` — CuiLogger, LogRecord, log levels
- **Standards opcionais (carregar quando necessário):**
  - `standards/dsl-constants.md` — LogMessages classes, constantes estruturadas
  - `standards/logmessages-documentation.md` — AsciiDoc para LogMessages
  - `standards/cui-http.md` — HttpResult pattern, retry, ETag caching
- **Fonte:** Smithery.ai

### dr-jskill
- **Descrição:** Gerador de projetos Java + Spring Boot seguindo as boas práticas de Julien Dubois. Cria web applications, full-stack apps (Vue.js/Angular/React/Vanilla JS), PostgreSQL, REST APIs e Docker.
- **Quando usar:** Ao criar novos projetos Spring Boot, configurar microservices ou bootstrapar aplicações enterprise com Spring Framework.
- **Capacidades:**
  - Geração de projetos via scripts Node.js (`create-project-latest.mjs`, `create-basic-project.mjs`, `create-web-project.mjs`, `create-fullstack-project.mjs`)
  - Suporte a front-end: Vue.js 3, React 19, Angular 21, Vanilla JS
  - Docker, Docker Compose, GraalVM native images
  - Integração com JDTLS para code intelligence
  - Deploy Azure Container Apps
- **Pré-requisitos:** Java 25, Node.js 24.x, npm 11.x, Docker
- **Referências:** `references/SPRING-BOOT-4.md`, `references/DATABASE.md`, `references/CONFIGURATION.md`, `references/SECURITY.md`, `references/TEST.md`, `references/DOCKER.md`, `references/GRAALVM.md`, `references/AZURE.md`, `references/GIT.md`, `references/PROJECT-SETUP.md`, `references/LOGGING.md`, `references/JDTLS.md`, `references/VUE.md`, `references/REACT.md`, `references/ANGULAR.md`, `references/VANILLA-JS.md`
- **AGENTS.md próprio:** Sim — contém regras adicionais (sem Lombok, Maven only, Hibernate ddl-auto, nunca ler .env)
- **Fonte:** GitHub (jdubois/dr-jskill)

### java-architect
- **Descrição:** Especialista Java enterprise focado em Spring Boot 3.x, arquitetura de microservices e desenvolvimento cloud-native com Java 21 LTS.
- **Quando usar:** Ao construir, configurar ou debugar aplicações Java enterprise com Spring Boot 3.x, microservices ou programação reativa.
- **Workflow:** Architecture analysis → Domain design (DDD) → Implementation → Data layer (JPA) → Security & config → Quality assurance (85%+ coverage)
- **Referências:**
  - `references/spring-boot-setup.md` — setup, configuração, starters
  - `references/reactive-webflux.md` — WebFlux, Project Reactor, R2DBC
  - `references/jpa-optimization.md` — JPA, Hibernate, query tuning
  - `references/spring-security.md` — OAuth2, JWT, method security
  - `references/testing-patterns.md` — JUnit 5, TestContainers, Mockito
- **Constraints:** Usar Java 21 LTS features, Flyway/Liquibase, OpenAPI/Swagger, nunca hardcodar valores, nunca usar blocking code em reactive
- **Fonte:** GitHub (jeffallan/claude-skills)

### java-microservices
- **Descrição:** Construir microservices de produção com Spring Cloud e padrões de sistemas distribuídos.
- **Quando usar:** Ao projetar arquitetura de microservices, implementar comunicação entre serviços, configurar padrões de resiliência, event-driven messaging ou distributed tracing.
- **Tópicos:**
  - Spring Cloud (Config Server, Eureka/Consul, API Gateway, LoadBalancer)
  - Resilience4j (Circuit Breaker, Retry, Bulkhead, Rate Limiting)
  - Event-Driven (Kafka, Spring Cloud Stream, Saga, Event Sourcing)
  - Observabilidade (Micrometer, Prometheus, log correlation)
- **Referências:** `references/GUIDE.md`, `references/PATTERNS.md`
- **Parâmetros:** `pattern` (saga, cqrs, event_sourcing, api_gateway), `messaging` (kafka, rabbitmq, redis)
- **Fonte:** GitHub (pluginagentmarketplace/custom-plugin-java)

### java-pro
- **Descrição:** Java 21+ com features modernas — virtual threads, pattern matching, Spring Boot 3.x, GraalVM, Project Loom e padrões cloud-native. Usar PROATIVAMENTE para desenvolvimento Java.
- **Quando usar:** Ao trabalhar em tarefas Java, necessitar de orientação ou boas práticas. Não usar para tarefas não relacionadas a Java.
- **Capacidades cobertas:** Modern Java Language Features, Virtual Threads & Concurrency, Spring Framework Ecosystem, JVM Performance & Optimization, Enterprise Architecture Patterns, Database & Persistence, Testing & Quality Assurance, Cloud-Native Development, Modern Build & DevOps, Security & Best Practices
- **Fonte:** GitHub (sickn33/antigravity-awesome-skills)

### java-spring-boot
- **Descrição:** Construir aplicações Spring Boot production-ready — REST APIs, Security, Data, Actuator.
- **Quando usar:** Ao criar REST APIs com Spring MVC/WebFlux, configurar Spring Security (OAuth2, JWT), configurar acesso a dados com Spring Data ou habilitar monitoring com Actuator.
- **Tópicos:** Spring Boot Core, REST API Development, Spring Security, Spring Data JPA, Actuator & Monitoring
- **Referências:** `references/GUIDE.md`, `references/PATTERNS.md`
- **Fonte:** GitHub (pluginagentmarketplace/custom-plugin-java)

### spring-boot-engineer
- **Descrição:** Gerar configurações Spring Boot 3.x, criar REST controllers, implementar fluxos de autenticação com Spring Security 6, configurar repositories Spring Data JPA e endpoints reativos WebFlux.
- **Quando usar:** Ao construir aplicações Spring Boot 3.x, microservices ou aplicações Java reativas.
- **Workflow:** Analyze → Design → Implement → Secure → Test → Deploy
- **Referências:**
  - `references/web.md` — Controllers, REST APIs, validation, exception handling
  - `references/data.md` — Spring Data JPA, repositories, transactions, projections
  - `references/security.md` — Spring Security 6, OAuth2, JWT, method security
  - `references/cloud.md` — Spring Cloud, Config, Discovery, Gateway, resilience
  - `references/testing.md` — @SpringBootTest, MockMvc, Testcontainers, test slices
- **Constraints:** Constructor injection obrigatório, validação de input em endpoints, @ConfigurationProperties para config type-safe, nunca field injection com @Autowired
- **Fonte:** GitHub (jeffallan/claude-skills)

### springboot-verification
- **Descrição:** Loop de verificação para projetos Spring Boot: build, análise estática, testes com coverage, scans de segurança e review de diff antes de release ou PR.
- **Quando usar:** Antes de abrir PR para serviço Spring Boot, após refactoring significativo ou upgrade de dependências, para verificação pré-deploy.
- **Fases:**
  1. Build (`mvn clean verify -DskipTests`)
  2. Análise estática (SpotBugs, PMD, Checkstyle)
  3. Testes + Coverage (JaCoCo, 80%+ coverage)
  4. Scan de segurança (OWASP dependency-check, secrets scan)
  5. Code format (Spotless, opcional)
  6. Diff review
- **Fonte:** GitHub (affaan-m/everything-claude-code)

### smithery-ai-cli
- **Descrição:** Encontrar, conectar e usar ferramentas MCP e skills via Smithery CLI.
- **Quando usar:** Quando o usuário busca novas ferramentas/skills, quer descobrir integrações, conectar a um MCP, instalar uma skill ou interagir com serviço externo (email, Slack, GitHub, Jira, Notion, etc.).
- **Capacidades:** Busca no marketplace (100K+ tools), conexão gerenciada com MCP, token scoping para segurança, output JSONL para pipes
- **Fonte:** Smithery.ai

---

## Classificação por Origem (skills-lock.json)

| Origem | Skills |
|--------|--------|
| **Smithery.ai** (well-known) | code-quality, code-readability, cui-java-core, smithery-ai-cli |
| **GitHub** (jdubois) | dr-jskill |
| **GitHub** (jeffallan) | java-architect, spring-boot-engineer |
| **GitHub** (pluginagentmarketplace) | java-microservices, java-spring-boot |
| **GitHub** (sickn33) | java-pro |
| **GitHub** (affaan-m) | springboot-verification |

---

## Relação entre Skills Spring Boot

Existem múltiplas skills que cobrem Spring Boot com diferentes focos e níveis de detalhe:

| Skill | Foco | Nível |
|-------|------|-------|
| `dr-jskill` | **Geração de projeto** — bootstrap completo com scripts, templates, Docker, front-end, deploy | Gerador/Scaffolding |
| `java-spring-boot` | **Referência rápida** — padrões REST API, Security, Data, Actuator com quick reference | Implementação |
| `spring-boot-engineer` | **Implementação guiada** — workflow completo com Quick Start templates, constraints MUST/MUST NOT | Implementação avançada |
| `java-architect` | **Arquitetura** — design de sistemas com DDD, Clean Architecture, reactive, security | Arquitetura/Design |
| `java-microservices` | **Distributed systems** — Spring Cloud, resilience, event-driven, observability | Microservices |
| `springboot-verification` | **Validação** — build, testes, security scan, diff review antes de PR/deploy | CI/CD/QA |

---

## Regras para Agentes

1. **Leia o SKILL.md antes de produzir output.** Cada skill define referências que são o contrato completo.
2. **`code-quality` e `code-readability` são transversais.** Aplicar SEMPRE em qualquer mudança de código.
3. **Para `cui-java-core`, carregue TODOS os 5 standards obrigatórios** antes de escrever qualquer código Java em projetos CUI.
4. **`dr-jskill` tem AGENTS.md próprio** com regras específicas (sem Lombok, Maven only, nunca ler .env). Consultar ao usar essa skill.
5. **Ao criar projeto novo:** use `dr-jskill` para bootstrap. Depois aplique as skills de implementação relevantes.
6. **Ao implementar features:** use `java-spring-boot` ou `spring-boot-engineer` conforme o nível de detalhe necessário.
7. **Ao projetar arquitetura:** use `java-architect` para decisões de design.
8. **Ao trabalhar com microservices:** use `java-microservices` para padrões distribuídos.
9. **Antes de PR/deploy:** use `springboot-verification` como checklist de validação.
10. **Para features modernas de Java 21+:** use `java-pro` como referência de capabilities.

---

## Referências

- Documentação Spring Boot: [spring.io/projects/spring-boot](https://spring.io/projects/spring-boot)
- Documentação Spring Security: [docs.spring.io/spring-security](https://docs.spring.io/spring-security/reference/)
- Documentação Spring Cloud: [spring.io/projects/spring-cloud](https://spring.io/projects/spring-cloud)
- Documentação Spring Data JPA: [spring.io/projects/spring-data-jpa](https://spring.io/projects/spring-data-jpa)
- Java 21 JEPs: [openjdk.org/projects/jdk/21](https://openjdk.org/projects/jdk/21/)
- GraalVM: [graalvm.org](https://www.graalvm.org/)
- Testcontainers: [testcontainers.com](https://testcontainers.com/)
- Resilience4j: [resilience4j.readme.io](https://resilience4j.readme.io/)
- Better Auth: [better-auth.com/docs](https://better-auth.com/docs)
- Smithery CLI: [smithery.ai](https://smithery.ai)
- Dr JSkill (Julien Dubois): [github.com/jdubois/dr-jskill](https://github.com/jdubois/dr-jskill)
