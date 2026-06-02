export interface Skill {
  name: string;
  source: string;
  sourceType: 'well-known' | 'github';
  category: string;
  description: string;
}

export const SKILLS: Skill[] = [
  {
    name: 'code-quality',
    source: 'code-quality',
    sourceType: 'well-known',
    category: 'Qualidade de Codigo',
    description: 'Diretrizes de qualidade de codigo. Aplicar SEMPRE em qualquer mudanca de codigo.',
  },
  {
    name: 'code-readability',
    source: 'code-readability',
    sourceType: 'well-known',
    category: 'Qualidade de Codigo',
    description: 'Escrita de codigo limpo, compreensivel e auto-documentado, facil de revisar e manter.',
  },
  {
    name: 'cui-java-core',
    source: 'cui-java-core',
    sourceType: 'well-known',
    category: 'Java Core & Padroes',
    description: 'Padroes de desenvolvimento Java para projetos CUI — coding patterns, null safety, Lombok, features modernas e logging.',
  },
  {
    name: 'java-pro',
    source: 'sickn33/antigravity-awesome-skills/skills/java-pro',
    sourceType: 'github',
    category: 'Java Core & Padroes',
    description: 'Java 21+ com features modernas — virtual threads, pattern matching, Spring Boot 3.x, GraalVM, Project Loom.',
  },
  {
    name: 'dr-jskill',
    source: 'jdubois/dr-jskill',
    sourceType: 'github',
    category: 'Spring Boot',
    description: 'Gerador de projetos Java + Spring Boot seguindo as boas praticas de Julien Dubois. Web, full-stack, PostgreSQL, REST APIs e Docker.',
  },
  {
    name: 'java-spring-boot',
    source: 'pluginagentmarketplace/custom-plugin-java/skills/java-spring-boot',
    sourceType: 'github',
    category: 'Spring Boot',
    description: 'Construir aplicacoes Spring Boot production-ready — REST APIs, Security, Data, Actuator.',
  },
  {
    name: 'spring-boot-engineer',
    source: 'jeffallan/claude-skills/skills/spring-boot-engineer',
    sourceType: 'github',
    category: 'Spring Boot',
    description: 'Gerar configuracoes Spring Boot 3.x, REST controllers, Spring Security 6, JPA repositories e WebFlux endpoints.',
  },
  {
    name: 'java-architect',
    source: 'jeffallan/claude-skills/skills/java-architect',
    sourceType: 'github',
    category: 'Arquitetura Enterprise',
    description: 'Especialista Java enterprise focado em Spring Boot 3.x, arquitetura de microservices e cloud-native com Java 21 LTS.',
  },
  {
    name: 'java-microservices',
    source: 'pluginagentmarketplace/custom-plugin-java/skills/java-microservices',
    sourceType: 'github',
    category: 'Microservices',
    description: 'Construir microservices de producao com Spring Cloud e padroes de sistemas distribuidos.',
  },
  {
    name: 'springboot-verification',
    source: 'affaan-m/everything-claude-code/docs/zh-CN/skills/springboot-verification',
    sourceType: 'github',
    category: 'Verificacao & CI/CD',
    description: 'Loop de verificacao para projetos Spring Boot: build, analise estatica, testes com coverage e scans de seguranca.',
  },
  {
    name: 'smithery-ai-cli',
    source: 'smithery-ai-cli',
    sourceType: 'well-known',
    category: 'Ferramentas',
    description: 'Encontrar, conectar e usar ferramentas MCP e skills via Smithery CLI.',
  },
];

export function getSourceLabel(skill: Skill): string {
  if (skill.sourceType === 'well-known') {
    return 'Smithery.ai (well-known)';
  }
  return `GitHub — ${skill.source}`;
}
