export interface Skill {
  name: string;
  displayName: string;
  source: string;
  sourceType: 'well-known' | 'github';
  category: string;
  description: string;
}

export const SKILLS: Skill[] = [
  {
    name: 'code-quality',
    displayName: 'Qualidade de Codigo',
    source: 'code-quality',
    sourceType: 'well-known',
    category: 'Qualidade de Codigo',
    description: 'Diretrizes de qualidade de codigo. Aplicar SEMPRE em qualquer mudanca de codigo.',
  },
  {
    name: 'code-readability',
    displayName: 'Codigo Limpo e Legivel',
    source: 'code-readability',
    sourceType: 'well-known',
    category: 'Qualidade de Codigo',
    description: 'Escrita de codigo limpo, compreensivel e auto-documentado, facil de revisar e manter.',
  },
  {
    name: 'cui-java-core',
    displayName: 'Java Core — Padroes CUI (Null Safety, Lombok, Logging)',
    source: 'cui-java-core',
    sourceType: 'well-known',
    category: 'Java Core & Padroes',
    description: 'Padroes de desenvolvimento Java para projetos CUI — coding patterns, null safety, Lombok, features modernas e logging.',
  },
  {
    name: 'java-pro',
    displayName: 'Java 21+ Avancado (Virtual Threads, GraalVM, Pattern Matching)',
    source: 'sickn33/antigravity-awesome-skills/skills/java-pro',
    sourceType: 'github',
    category: 'Java Core & Padroes',
    description: 'Java 21+ com features modernas — virtual threads, pattern matching, Spring Boot 3.x, GraalVM, Project Loom.',
  },
  {
    name: 'dr-jskill',
    displayName: 'Gerador de Projetos Spring Boot (Full-stack, Docker, PostgreSQL)',
    source: 'jdubois/dr-jskill',
    sourceType: 'github',
    category: 'Spring Boot',
    description: 'Gerador de projetos Java + Spring Boot seguindo as boas praticas de Julien Dubois. Web, full-stack, PostgreSQL, REST APIs e Docker.',
  },
  {
    name: 'java-spring-boot',
    displayName: 'Spring Boot — REST APIs, Security, Data, Actuator',
    source: 'pluginagentmarketplace/custom-plugin-java/skills/java-spring-boot',
    sourceType: 'github',
    category: 'Spring Boot',
    description: 'Construir aplicacoes Spring Boot production-ready — REST APIs, Security, Data, Actuator.',
  },
  {
    name: 'spring-boot-engineer',
    displayName: 'Spring Boot 3.x Engineer (WebFlux, JPA, Security 6)',
    source: 'jeffallan/claude-skills/skills/spring-boot-engineer',
    sourceType: 'github',
    category: 'Spring Boot',
    description: 'Gerar configuracoes Spring Boot 3.x, REST controllers, Spring Security 6, JPA repositories e WebFlux endpoints.',
  },
  {
    name: 'java-architect',
    displayName: 'Arquitetura Java Enterprise (DDD, Cloud-Native, Reactive)',
    source: 'jeffallan/claude-skills/skills/java-architect',
    sourceType: 'github',
    category: 'Arquitetura Enterprise',
    description: 'Especialista Java enterprise focado em Spring Boot 3.x, arquitetura de microservices e cloud-native com Java 21 LTS.',
  },
  {
    name: 'java-microservices',
    displayName: 'Microservices — Spring Cloud, Kafka, Resiliencia, Observabilidade',
    source: 'pluginagentmarketplace/custom-plugin-java/skills/java-microservices',
    sourceType: 'github',
    category: 'Microservices',
    description: 'Construir microservices de producao com Spring Cloud e padroes de sistemas distribuidos.',
  },
  {
    name: 'springboot-verification',
    displayName: 'Verificacao e CI/CD (Build, Testes, Scan de Seguranca)',
    source: 'affaan-m/everything-claude-code/docs/zh-CN/skills/springboot-verification',
    sourceType: 'github',
    category: 'Verificacao & CI/CD',
    description: 'Loop de verificacao para projetos Spring Boot: build, analise estatica, testes com coverage e scans de seguranca.',
  },
  {
    name: 'smithery-ai-cli',
    displayName: 'Smithery CLI — Buscar e Conectar Ferramentas MCP',
    source: 'smithery-ai-cli',
    sourceType: 'well-known',
    category: 'Ferramentas',
    description: 'Encontrar, conectar e usar ferramentas MCP e skills via Smithery CLI.',
  },
];

export function getSourceLabel(skill: Skill): string {
  return skill.sourceType === 'well-known' ? 'Smithery' : 'GitHub';
}
