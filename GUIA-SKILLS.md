# Guia Prático de Skills — Java

Guia com situações reais e exemplos de como utilizar cada skill do repositório `skill-java`.

---

## Setup Local — Claude + OpenCode + VSCode

As skills estão configuradas para funcionar **localmente** (sem dependências externas) nas três ferramentas:

| Ferramenta | Arquivo de instruções | Skills | Config adicional |
|------------|----------------------|--------|-----------------|
| **Claude Code** | `CLAUDE.md` | `skills/` | — |
| **OpenCode** | `AGENTS.md` | `skills/` | `.opencode/opencode.jsonc` |
| **VSCode** | `.vscode/settings.json` | `skills/` (via extensões AI) | `.vscode/extensions.json` |

### Como cada ferramenta carrega as skills

- **Claude Code**: Lê `CLAUDE.md` ao iniciar no diretório e carrega skills de `skills/`.
- **OpenCode**: Lê `AGENTS.md` + `.opencode/opencode.jsonc` e carrega skills do diretório configurado (`mode: local-only`).
- **VSCode**: Extensões como GitHub Copilot e Continue leem instruções do workspace (`.vscode/`, `.github/copilot-instructions.md`) e podem referenciar skills locais.

### Estrutura de arquivos

```
java-dia-dia/
├── AGENTS.md              # Instruções principais (OpenCode)
├── CLAUDE.md              # Instruções Claude Code
├── GUIA-SKILLS.md         # Este guia
├── skills-lock.json       # Lock file com hashes (skills externas)
├── skills.sh.json         # Configuração skills.sh
├── scripts/
│   └── postinstall.sh     # Gera symlinks em .claude/skills/ e .agents/skills/
├── skills/                # 11 skills em 6 buckets
│   ├── core/
│   │   ├── code-quality/
│   │   └── code-readability/
│   ├── java/
│   │   ├── cui-java-core/
│   │   └── java-pro/
│   ├── spring-boot/
│   │   ├── dr-jskill/
│   │   ├── java-spring-boot/
│   │   └── spring-boot-engineer/
│   ├── architecture/
│   │   ├── java-architect/
│   │   └── java-microservices/
│   ├── verification/
│   │   └── springboot-verification/
│   └── tools/
│       └── smithery-ai-cli/
├── .opencode/
│   └── opencode.jsonc     # Config OpenCode (local-only)
└── .vscode/
    ├── settings.json       # Config do editor
    └── extensions.json     # Extensões recomendadas
```

### Frontmatter padronizado

Todos os `SKILL.md` seguem o mesmo formato com:

```yaml
---
name: nome-da-skill
description: Descrição da skill
allowed-tools: [Read, Edit, Write, Bash, Grep, Glob]

---
```

---

## 1. code-quality

**Skill transversal — aplicar SEMPRE em qualquer mudança de código.**

### Situações de uso

- Revisando qualquer pull request
- Escrevendo ou editando código Java, TypeScript ou qualquer linguagem
- Nomeando variáveis, métodos ou classes
- Decidindo se criar um arquivo novo ou editar existente

### Exemplos de aplicação (conforme a skill)

**Naming — sem abreviações:**
```java
// ERRADO
int num = getNum();
boolean gt = isGt(a, b);

// CORRETO (conforme a skill)
int number = getNumber();
boolean greaterThan = isGreaterThan(a, b);
```

**Sem código permissivo — usar preconditions:**
```java
// ERRADO: aceitar múltiplos formatos
public void process(Object input) {
    if (input instanceof String s) { /* ... */ }
    else if (input instanceof Integer i) { /* ... */ }
    else { /* silently ignore */ }
}

// CORRETO (conforme a skill): validar e falhar cedo
public void process(String input) {
    Objects.requireNonNull(input, "input must not be null");
    // processa formato único esperado
}
```

**Sem try/catch defensivo — deixar exceções propagarem:**
```java
// ERRADO
try {
    return repository.findById(id);
} catch (Exception e) {
    log.error("Error", e);
    return null; // engoliu a exceção
}

// CORRETO (conforme a skill)
return repository.findById(id); // exceção propaga naturalmente
```

---

## 2. code-readability

**Código limpo que comunica sua intenção.**

### Situações de uso

- Escrever métodos ou classes novas
- Revisar código de outros
- Refatorar código existente para maior clareza
- Nomear variáveis e funções

### Exemplos de aplicação (conforme a skill)

**Nomes descritivos:**
```java
// ERRADO
boolean enabled = checkConn();

// CORRETO (conforme a skill)
boolean isServerConnected = checkServerConnection();
```

**Clareza sobre esperteza:**
```java
// ERRADO: one-liner críptico
return items.stream().reduce(0, (a,b) -> a + (b.q() > 0 ? b.p() * b.q() : 0), Integer::sum);

// CORRETO (conforme a skill): variáveis intermediárias nomeadas
int totalPrice = 0;
for (var item : items) {
    if (item.quantity() > 0) {
        int itemTotal = item.price() * item.quantity();
        totalPrice += itemTotal;
    }
}
return totalPrice;
```

---

## 3. cui-java-core

**Padrões Java fundamentais para projetos CUI.**

### Situações de uso

- Criar qualquer classe Java nova em projeto CUI
- Implementar null safety com @NullMarked
- Configurar logging com CuiLogger (não SLF4J)
- Usar Lombok corretamente (@Delegate, @Builder, @Value)
- Aplicar features modernas do Java (records, switch expressions)

### Como usar

Carregar TODOS os 5 standards obrigatórios antes de escrever código. Depois carregar os opcionais conforme a necessidade.

### Exemplos de aplicação (conforme a skill)

**Classe completa seguindo os standards:**
```java
// package-info.java (conforme null-safety standard)
@NullMarked
package de.cuioss.portal.authentication;
import org.jspecify.annotations.NullMarked;

// TokenValidator.java (conforme todos os standards)
@Value
@Builder
public class TokenValidator {
    private static final CuiLogger LOGGER = new CuiLogger(TokenValidator.class);

    String issuer;
    @Builder.Default
    Duration validity = Duration.ofHours(1);

    public ValidationResult validate(String token) {
        Objects.requireNonNull(token, "token must not be null");
        try {
            String userId = extractUserId(token);
            boolean isValid = performValidation(token);
            if (isValid) {
                LOGGER.info(INFO.VALIDATION_SUCCESS, userId);
                return ValidationResult.valid();
            }
            LOGGER.error(ERROR.VALIDATION_FAILED, userId, "Invalid signature");
            return ValidationResult.invalid("Invalid signature");
        } catch (TokenException e) {
            LOGGER.error(e, ERROR.VALIDATION_FAILED, "unknown", e.getMessage());
            throw new ValidationException("Validation failed", e);
        }
    }

    // Optional para "sem resultado" (conforme null-safety standard)
    public Optional<UserInfo> extractUserInfo(String token) {
        return parseToken(token).map(this::extractUser);
    }
}
```

**LogMessages com DSL (conforme logging standard):**
```java
@UtilityClass
public final class TokenLogMessages {
    public static final String PREFIX = "TOKEN";

    @UtilityClass
    public static final class INFO {
        public static final LogRecord VALIDATION_SUCCESS = LogRecordModel.builder()
            .template("Token validated successfully for user %s")
            .prefix(PREFIX).identifier(1).build();
    }

    @UtilityClass
    public static final class ERROR {
        public static final LogRecord VALIDATION_FAILED = LogRecordModel.builder()
            .template("Token validation failed for user %s: %s")
            .prefix(PREFIX).identifier(200).build();
    }
}
```

**Record com validação (conforme modern-features standard):**
```java
public record TokenConfig(String issuer, Duration validity, Set<String> requiredClaims) {
    public TokenConfig {
        Objects.requireNonNull(issuer, "issuer must not be null");
        Objects.requireNonNull(validity, "validity must not be null");
        if (validity.isNegative() || validity.isZero()) {
            throw new IllegalArgumentException("Validity must be positive");
        }
        requiredClaims = Set.copyOf(requiredClaims); // Defensive copy
    }
}
```

**Switch expression (conforme modern-features standard):**
```java
ValidationResult validate(Token token) {
    return switch (token.getType()) {
        case JWT -> jwtValidator.validate(token);
        case OAUTH2 -> oauth2Validator.validate(token);
        case LEGACY -> ValidationResult.invalid("Legacy tokens not supported");
    };
}
```

---

## 4. dr-jskill

**Gerador de projetos Spring Boot com boas práticas de Julien Dubois.**

### Situações de uso

- Criar um novo projeto Spring Boot do zero
- Bootstrapar aplicação full-stack (Java + Vue.js/React/Angular)
- Configurar Docker e Docker Compose para desenvolvimento
- Gerar projeto com GraalVM native image support
- Deploy para Azure Container Apps

### Como usar

Executar os scripts Node.js incluídos. Consultar `AGENTS.md` próprio para regras específicas.

### Exemplos de uso (conforme a skill)

**Criar projeto full-stack (conforme scripts):**
```bash
# Projeto fullstack com Spring Boot + front-end
node scripts/create-project-latest.mjs my-app com.myco my-app com.myco.myapp 21 fullstack \
  --output-dir /path/to/workspace

# Projeto web simples
node scripts/create-project-latest.mjs my-api com.myco my-api com.myco.myapi 21 web

# Projeto básico/mínimo
node scripts/create-project-latest.mjs my-service com.myco my-service com.myco.myservice 21 basic
```

**Validação do projeto gerado (conforme a skill):**
```bash
./mvnw clean install        # Build backend
./mvnw test                 # Unit tests
./mvnw verify               # Integration tests (Testcontainers)
cd frontend && npm run dev  # Front-end dev server
```

**Estrutura do projeto gerado:**
```
my-spring-boot-app/
├── .gitignore, .env.sample, .editorconfig, .gitattributes, .dockerignore
├── src/main/java/com/example/app/
│   ├── Application.java
│   ├── config/
│   ├── controller/
│   ├── service/         # Só se necessário
│   ├── repository/
│   └── domain/
├── src/main/resources/
│   ├── static/          # Assets front-end
│   └── application.properties
├── Dockerfile, Dockerfile-native
├── compose.yaml, docker-compose.yml
└── pom.xml
```

**Regras específicas do AGENTS.md do dr-jskill:**
- NUNCA usar Lombok nos projetos gerados
- Build tool: Maven only (sem Gradle)
- Banco: Hibernate ddl-auto (sem Flyway/Liquibase)
- NUNCA ler ou expor arquivo `.env` (contém secrets reais)
- Preferir `lsp` tool sobre grep/view/sed para trabalhar com Java

---

## 5. java-architect

**Arquitetura enterprise com Spring Boot 3.x.**

### Situações de uso

- Projetar a arquitetura de um sistema enterprise novo
- Implementar endpoints WebFlux reativos
- Otimizar queries JPA/Hibernate (evitar N+1)
- Configurar Spring Security com OAuth2/JWT
- Resolver problemas de autenticação e processamento assíncrono

### Como usar

Seguir o workflow: Architecture → Domain (DDD) → Implementation → Data layer → Security → QA. Consultar `references/` conforme o tópico.

### Exemplos (conforme a skill)

**WebFlux REST endpoint:**
```java
@RestController
@RequestMapping("/api/v1/orders")
@RequiredArgsConstructor
public class OrderController {
    private final OrderService orderService;

    @GetMapping("/{id}")
    public Mono<ResponseEntity<OrderDto>> getOrder(@PathVariable UUID id) {
        return orderService.findById(id)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }
}
```

**JPA query otimizada (evitando N+1):**
```java
public interface OrderRepository extends JpaRepository<Order, UUID> {
    // JOIN FETCH evita N+1
    @Query("SELECT o FROM Order o JOIN FETCH o.items WHERE o.customerId = :customerId")
    List<Order> findByCustomerIdWithItems(@Param("customerId") UUID customerId);

    // Projection limita colunas
    @Query("SELECT new com.example.dto.OrderSummary(o.id, o.status, o.total) "
         + "FROM Order o WHERE o.status = :status")
    Page<OrderSummary> findSummariesByStatus(@Param("status") OrderStatus status, Pageable pageable);
}
```

**Spring Security OAuth2 JWT:**
```java
@Configuration
@EnableMethodSecurity
public class SecurityConfig {
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        return http
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(s -> s.sessionCreationPolicy(STATELESS))
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/actuator/health").permitAll()
                .anyRequest().authenticated())
            .oauth2ResourceServer(oauth2 -> oauth2.jwt(Customizer.withDefaults()))
            .build();
    }
}
```

---

## 6. java-microservices

**Padrões de microservices com Spring Cloud.**

### Situações de uso

- Projetar arquitetura de microservices
- Implementar Saga pattern para transações distribuídas
- Configurar Circuit Breaker com Resilience4j
- Configurar API Gateway com Spring Cloud Gateway
- Implementar mensageria com Kafka/RabbitMQ
- Configurar distributed tracing

### Exemplos (conforme a skill)

**Saga com Choreography (Kafka):**
```java
@Component
public class OrderSagaListener {
    @KafkaListener(topics = "order.created")
    public void handleOrderCreated(OrderCreatedEvent event) {
        inventoryService.reserve(event.getItems());
    }

    @KafkaListener(topics = "payment.failed")
    public void handlePaymentFailed(PaymentFailedEvent event) {
        // Transação compensatória
        inventoryService.release(event.getOrderId());
        orderService.cancel(event.getOrderId());
    }
}
```

**Circuit Breaker (conforme a skill):**
```java
@Configuration
public class ResilienceConfig {
    @Bean
    public Customizer<Resilience4JCircuitBreakerFactory> cbCustomizer() {
        return factory -> factory.configureDefault(id ->
            new Resilience4JConfigBuilder(id)
                .circuitBreakerConfig(CircuitBreakerConfig.custom()
                    .failureRateThreshold(50)
                    .waitDurationInOpenState(Duration.ofSeconds(30))
                    .slidingWindowSize(10)
                    .build())
                .build());
    }
}
```

**API Gateway routes:**
```java
@Bean
public RouteLocator routes(RouteLocatorBuilder builder) {
    return builder.routes()
        .route("orders", r -> r
            .path("/api/orders/**")
            .filters(f -> f
                .stripPrefix(1)
                .circuitBreaker(c -> c.setName("order-cb"))
                .retry(retry -> retry.setRetries(3)))
            .uri("lb://order-service"))
        .build();
}
```

**Estados do Circuit Breaker:**
```
CLOSED → (falhas excedem threshold) → OPEN
OPEN → (wait duration) → HALF_OPEN
HALF_OPEN → (sucesso) → CLOSED
HALF_OPEN → (falha) → OPEN
```

---

## 7. java-pro

**Java 21+ moderno — referência de capabilities.**

### Situações de uso

- Migrar aplicação para usar virtual threads
- Usar pattern matching para switch e instanceof
- Implementar records para data carriers imutáveis
- Otimizar performance da JVM (G1, ZGC, GraalVM)
- Implementar sealed classes para herança controlada
- Usar structured concurrency

### Como usar

A skill funciona como referência de capabilities e behavioral traits. Usar quando precisar de orientação sobre features modernas do Java 21+.

### Exemplos de interações típicas (conforme a skill)

```
"Migrar esta aplicação Spring Boot para usar virtual threads"
"Projetar uma arquitetura de microservices com Spring Cloud e padrões de resiliência"
"Otimizar performance JVM para processamento de transações de alta vazão"
"Implementar autenticação OAuth2 com Spring Security 6"
"Criar build GraalVM native image para startup mais rápido em container"
"Projetar sistema event-driven com Spring Events e message brokers"
"Configurar testes com Testcontainers e Spring Boot Test"
```

---

## 8. java-spring-boot

**Referência rápida para aplicações Spring Boot production-ready.**

### Situações de uso

- Criar REST API com @RestController
- Configurar Spring Security (SecurityFilterChain)
- Implementar Spring Data JPA (repositories, queries)
- Configurar Actuator para monitoring
- Implementar validação com Bean Validation
- Tratar exceções com @ControllerAdvice

### Exemplos (conforme a skill)

**REST Controller com validação:**
```java
@RestController
@RequestMapping("/api/users")
@Validated
public class UserController {
    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        return userService.findById(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<User> createUser(@Valid @RequestBody UserRequest request) {
        User user = userService.create(request);
        URI location = URI.create("/api/users/" + user.getId());
        return ResponseEntity.created(location).body(user);
    }
}
```

**DTO com validação (Record):**
```java
public record CreateUserRequest(
    @NotBlank @Size(max = 100) String name,
    @Email @NotBlank String email,
    @NotNull @Min(18) Integer age
) {}
```

**Exception handler global:**
```java
@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(EntityNotFoundException.class)
    public ProblemDetail handleNotFound(EntityNotFoundException ex) {
        return ProblemDetail.forStatusAndDetail(NOT_FOUND, ex.getMessage());
    }
}
```

**Propriedades de debug (conforme a skill):**
```properties
debug=true
logging.level.org.springframework.security=DEBUG
spring.jpa.show-sql=true
```

---

## 9. spring-boot-engineer

**Implementação guiada com workflow e templates prontos.**

### Situações de uso

- Construir feature completa (Entity → Repository → Service → Controller → Test)
- Implementar padrão CRUD com todas as camadas
- Configurar segurança com OAuth2/JWT
- Criar test slices (@WebMvcTest, @DataJpaTest)
- Seguir regras MUST/MUST NOT obrigatórias

### Como usar

Seguir o workflow: Analyze → Design → Implement → Secure → Test → Deploy. Consultar `references/` por tópico.

### Exemplos (conforme a skill)

**Quick Start — feature completa:**

```java
// 1. Entity
@Entity
@Table(name = "products")
public class Product {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @NotBlank private String name;
    @DecimalMin("0.0") private BigDecimal price;
}

// 2. Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    List<Product> findByNameContainingIgnoreCase(String name);
}

// 3. Service (constructor injection — NUNCA @Autowired em fields)
@Service
public class ProductService {
    private final ProductRepository repo;
    public ProductService(ProductRepository repo) { this.repo = repo; }

    @Transactional(readOnly = true)
    public List<Product> search(String name) {
        return repo.findByNameContainingIgnoreCase(name);
    }
}

// 4. Controller
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {
    private final ProductService service;
    public ProductController(ProductService service) { this.service = service; }

    @PostMapping @ResponseStatus(HttpStatus.CREATED)
    public Product create(@Valid @RequestBody ProductRequest request) {
        return service.create(request);
    }
}

// 5. Test Slice
@WebMvcTest(ProductController.class)
class ProductControllerTest {
    @Autowired MockMvc mockMvc;
    @MockBean ProductService service;

    @Test
    void createProduct_validRequest_returns201() throws Exception {
        when(service.create(any())).thenReturn(product);
        mockMvc.perform(post("/api/v1/products")
                .contentType(APPLICATION_JSON)
                .content("""{"name":"Widget","price":10.0}"""))
            .andExpect(status().isCreated());
    }
}
```

**Regras MUST NOT (conforme a skill):**
- NÃO usar field injection (`@Autowired` em fields)
- NÃO pular validação de input em endpoints
- NÃO usar `@Component` quando `@Service`/`@Repository`/`@Controller` se aplica
- NÃO misturar blocking e reactive (`.block()` dentro de chain WebFlux)
- NÃO guardar secrets em `application.properties`/`application.yml`
- NÃO usar padrões deprecados do Spring Boot 2.x (`WebSecurityConfigurerAdapter`)

---

## 10. springboot-verification

**Checklist de verificação antes de PR/deploy.**

### Situações de uso

- Antes de abrir Pull Request para serviço Spring Boot
- Após refactoring significativo ou upgrade de dependências
- Verificação pré-deploy para staging ou produção
- Validar coverage de testes (80%+ obrigatório)

### Como usar

Executar as 6 fases em sequência. Se alguma falhar, parar e corrigir.

### Fases (conforme a skill)

**Fase 1 — Build:**
```bash
mvn -T 4 clean verify -DskipTests
```

**Fase 2 — Análise estática:**
```bash
mvn -T 4 spotbugs:check pmd:check checkstyle:check
```

**Fase 3 — Testes + Coverage:**
```bash
mvn -T 4 test
mvn jacoco:report   # verificar 80%+ coverage
```

**Fase 4 — Segurança:**
```bash
# CVEs em dependências
mvn org.owasp:dependency-check-maven:check

# Secrets no código
grep -rn "password\s*=\s*\"" src/ --include="*.java" --include="*.yml" --include="*.properties"
grep -rn "sk-\|api_key\|secret" src/ --include="*.java" --include="*.yml"
```

**Fase 5 — Formatação:**
```bash
mvn spotless:apply
```

**Fase 6 — Diff review:**
```bash
git diff --stat
git diff
```

**Template de output (conforme a skill):**
```
VERIFICATION REPORT
===================
Build:     [PASS/FAIL]
Static:    [PASS/FAIL] (spotbugs/pmd/checkstyle)
Tests:     [PASS/FAIL] (X/Y passed, Z% coverage)
Security:  [PASS/FAIL] (CVE findings: N)
Diff:      [X files changed]

Overall:   [READY / NOT READY]
```

---

## 11. smithery-ai-cli

**Marketplace de ferramentas e skills para agentes AI.**

### Situações de uso

- Buscar integrações para serviços externos (GitHub, Jira, Slack, Notion, etc.)
- Conectar a um MCP server para usar ferramentas externas
- Instalar novas skills de desenvolvimento
- Gerar tokens com escopo restrito para agentes

### Exemplos (conforme a skill)

```bash
# Instalar CLI
npm install -g @smithery/cli

# Autenticar
smithery auth login

# Buscar servidores MCP
smithery mcp search "github"

# Conectar a um servidor
smithery mcp add "https://github.run.tools" --id github

# Listar ferramentas disponíveis
smithery tool list github

# Chamar uma ferramenta
smithery tool call github issues.create '{"repo": "owner/repo", "title": "Bug"}'
```

---

## Tabela de Decisão Rápida

| Cenário | Skill(s) a consultar |
|---------|---------------------|
| Qualquer mudança de código | `code-quality`, `code-readability` |
| Criar projeto Spring Boot novo | `dr-jskill` |
| Implementar REST API | `java-spring-boot` ou `spring-boot-engineer` |
| Feature CRUD completa (Entity→Test) | `spring-boot-engineer` |
| Arquitetura de sistema enterprise | `java-architect` |
| Programação reativa (WebFlux) | `java-architect` (references/reactive-webflux.md) |
| Otimizar queries JPA/Hibernate | `java-architect` (references/jpa-optimization.md) |
| Configurar Spring Security | `java-architect` ou `spring-boot-engineer` (references/security.md) |
| Microservices (Spring Cloud) | `java-microservices` |
| Saga pattern / Event-driven | `java-microservices` |
| Circuit Breaker / Resilience | `java-microservices` |
| Features Java 21+ (virtual threads, records) | `java-pro` |
| Null safety / Lombok / Logging CUI | `cui-java-core` |
| Verificação antes de PR | `springboot-verification` |
| Conectar a serviços externos (MCP) | `smithery-ai-cli` |
| Docker / GraalVM / Deploy Azure | `dr-jskill` (references correspondentes) |
| Testes (JUnit 5, Testcontainers, MockMvc) | `spring-boot-engineer` (references/testing.md) |

---

## Fluxo de Trabalho Recomendado

```
1. Criar projeto          → dr-jskill (bootstrap)
2. Projetar arquitetura   → java-architect (design)
3. Implementar features   → spring-boot-engineer (código)
4. Aplicar padrões Java   → java-pro + cui-java-core (qualidade)
5. Microservices          → java-microservices (se aplicável)
6. Revisão de qualidade   → code-quality + code-readability (sempre)
7. Verificação final      → springboot-verification (antes do PR)
```
