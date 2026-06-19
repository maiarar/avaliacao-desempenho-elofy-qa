# Teste técnico prático Elofy - QA

> Documento criado para detalhar o teste técnico prático de QA da Elofy, com foco em testes de API e automação, explanando qual lógica de teste apliquei.

## Índice
- [Teste técnico prático Elofy - QA](#teste-técnico-prático-elofy---qa)
  - [Índice](#índice)
  - [Estrutura de Arquivos](#estrutura-de-arquivos)
  - [Entregáveis](#entregáveis)
  - [Como usar](#como-usar)
    - [Testes E2E (Manual)](#testes-e2e-manual)
    - [Testes de API (Automatizados)](#testes-de-api-automatizados)
    - [Testes Manuais com Postman](#testes-manuais-com-postman)
    - [Documentação](#documentação)
  - [Diário do que foi realizado (leiam se quiserem entender a lógica que apliquei)](#diário-do-que-foi-realizado-leiam-se-quiserem-entender-a-lógica-que-apliquei)
  - [Entidades e regras](#entidades-e-regras)
    - [Principais regras de negócio:](#principais-regras-de-negócio)
  - [Cenários de teste](#cenários-de-teste)
    - [Testes E2E (Manual - Interface do Usuário)](#testes-e2e-manual---interface-do-usuário)
    - [Testes de API (Automatizados)](#testes-de-api-automatizados-1)
    - [Recursos Postman/Swagger](#recursos-postmanswagger)
  - [Testes Não Implementados - Justificativa](#testes-não-implementados---justificativa)
    - [1. **Testes de Performance e Carga**](#1-testes-de-performance-e-carga)
    - [2. **Testes de Segurança Aprofundados**](#2-testes-de-segurança-aprofundados)
    - [3. **Testes Automatizados de Fluxos de Notas e Corner Cases**](#3-testes-automatizados-de-fluxos-de-notas-e-corner-cases)

## Estrutura de Arquivos

```
qa/
├── tests/
│   ├── e2e.md                          # Matriz completa de 93 cenários E2E (UI)
│   └── api/
│       ├── automation/
│       │   ├── commons.js              # Utilitários compartilhados
│       │   ├── constants.js            # Constantes de teste
│       │   ├── entities/               # Testes por entidade (7 arquivos)
│       │   │   ├── competencies.test.js
│       │   │   ├── cycles.test.js
│       │   │   ├── employees.test.js
│       │   │   ├── evaluations.test.js
│       │   │   ├── health.test.js
│       │   │   ├── reports.test.js
│       │   │   └── teams.test.js
│       │   └── regression/
│       │       └── e2e.test.js         # Testes E2E de regressão de API
│       └── collection_postman/
│           ├── Avaliação de Desempenho.postman_collection.json
│           ├── Localhost.postman_environment.json
│           └── swagger.json
├── docs/
│   ├── TESTE_TECNICO_QA.pdf            # Documentação do teste técnico
│   ├── case qa.pdf                     # Case de QA
│   ├── EstrategiaTeste.md              # Estratégia de teste
│   └── RegrasNegocio.md                # Regras de negócio
├── diagramas/
│   └── Elofy - Avaliação de Desempenho.drawio  # Diagrama das entidades
├── img/
│   └── test_pyramid.png                # Pirâmide de testes
├── vitest.config.js
└── package.json
```

## Entregáveis
1. **Testes E2E (UI)**: 93 cenários estruturados em matriz com prioridade, complexidade e esforço
   - Casos de sucesso, limite e restrição
   - Cenários de notas e pesos
   - Fluxos completos (E2E críticos)
   - Validação de dados (segurança)
   - Testes cross-browser
2. **Testes de API**: 7 suítes de automação por entidade + regressão
3. **Documentação**: PDFs, diagramas, estratégia e regras de negócio
4. **Recursos Postman**: Collection, environment e Swagger para testes manuais

## Como usar

### Testes E2E (Manual)
- Veja a matriz de testes E2E com 93 cenários em [e2e.md](./tests/e2e.md)
- Documento com índice navegável contendo todos os cenários organizados por categoria
- Cada teste inclui: ID, tipo, entidade, cenário, pré-condições, descrição, resultado esperado, prioridade, complexidade e esforço

### Testes de API (Automatizados)
```bash
npm run test              # Rodar testes de API
npm run test:ui          # Abrir relatório visual no navegador
```

- Testes estão em `tests/api/automation/`
- 7 entidades testadas: competências, times, colaboradores, ciclos, avaliações, relatórios, health check
- 1 arquivo de regressão E2E de API

### Testes Manuais com Postman
- Acesse a pasta [tests/api/collection_postman/](./tests/api/collection_postman/)
- Importe a collection e environment no Postman
- Acesse também o [swagger.json](./tests/api/collection_postman/swagger.json) para documentação interativa

### Documentação
- [Diagrama do sistema](./diagramas/Elofy%20-%20Avaliação%20de%20Desempenho.drawio) - Drawio com entidades e relacionamentos
- [Estratégia de teste](./docs/) - PDFs com contextualização do teste técnico
- [Pirâmide de testes](./img/test_pyramid.png) - Visualização da estratégia de testes

## Diário do que foi realizado (leiam se quiserem entender a lógica que apliquei)
1. Instalação do Node com FnM (para gerenciar múltiplas versões do Node, sempre atualizadas)
2. `npm install` (para instalar as dependências do projeto) e `npm run dev` (para iniciar o projeto)
3. Desenho de rascunho de entidades enquanto lia a descrição do sistema, para entender o contexto e as regras de negócio
4. Criação de matriz de cenários E2E com casos de sucesso, limite e restrição para todas as entidades
5. Adição de campos de notas e pesos validação com testes específicos
6. Expansão para fluxos completos (E2E críticos) para garantir integração completa
7. Adição de testes de validação de dados (segurança, XSS, SQL injection)
8. Adição de testes cross-browser para diferentes navegadores e resoluções
9. Criação de suítes de automação de API com vitest para 7 entidades
10. Adição de testes de regressão E2E
11. Documentação completa com diagramas, PDFs e índices navegáveis

## Entidades e regras

Entendendo o contexto do sistema, as entidades e regras:
1. **Competências** - o que é avaliado (apenas um nome). São vinculadas aos ciclos.
2. **Times** - organograma hierárquico (um time pode ter um time superior, sem limite de profundidade).
3. **Colaboradores** - os avaliados. Cada um pertence a exatamente um time e pode ter zero ou um gestor direto (que também é um colaborador).
4. **Ciclos** - período + regras de uma rodada: nome, datas, times participantes e competências. Têm a opção de pesos por competência: quando ativa, a soma dos pesos deve ser exatamente 100. Configuração só é editável enquanto o ciclo está em rascunho (draft).
5. **Avaliações** - geradas automaticamente ao iniciar o ciclo. Cada colaborador dos times participantes recebe: (1) uma autoavaliação, (2) uma avaliação do gestor direto (se houver) e (3) uma avaliação de cada colega do mesmo time. São respondidas (notas de 1 a 5 por competência) somente enquanto a data atual estiver dentro do período. Ao final, o sistema calcula médias e emite relatórios.

### Principais regras de negócio:

- Geração de avaliações (ao iniciar o ciclo), para cada colaborador dos times participantes:
    - 1 autoavaliação (sempre);
    - 1 avaliação de gestor (só se tiver gestor);
    - 1 avaliação de par para cada colega do mesmo time direto, exceto ele mesmo e exceto o gestor.
- Responder só é permitido com a data atual dentro do período do ciclo (start_date ≤ hoje ≤ end_date, inclusive).
- Notas são inteiros de 1 a 5, uma por competência do ciclo.
- Pesos (opcional por ciclo): quando ativos, a soma dos pesos deve ser exatamente 100

## Cenários de teste

### Testes E2E (Manual - Interface do Usuário)
- **Local**: [e2e.md](./tests/e2e.md)
- **Total**: 93 cenários organizados em 5 categorias com índice navegável
- **Categorias**:
  1. **Matriz de Cenários - Sucesso, Limite e Restrição** (57 testes)
     - CRUD para todas as 6 entidades (Competência, Time, Colaborador, Ciclo, Avaliação, Relatório)
     - Casos limite (boundary values, validações)
     - Casos de restrição (violações de regras de negócio)
  
  2. **Matriz de Notas e Pesos** (11 testes)
     - Validação de notas (1-5)
     - Cálculo de médias simples e ponderadas
     - Validação de pesos (soma = 100%)
  
  3. **Fluxos Completos (E2E Críticos)** (5 testes)
     - Ciclo completo: criação → resposta → encerramento → relatório
     - Múltiplos ciclos paralelos
     - Estruturas hierárquicas
     - Fluxos mínimos e máximos
  
  4. **Validação de Dados** (10 testes)
     - Prevenção de XSS/SQL injection
     - Limite de caracteres
     - Validação de datas
     - Suporte a Unicode/emoji
  
  5. **Navegadores Diferentes** (10 testes)
     - Navegadores atuais (Chrome, Firefox, Safari, Edge)
     - Navegadores legados
     - Testes mobile (Android, iOS)
     - Testes de resoluções diferentes
     - Teste com rede lenta

**Cada teste inclui**: ID, tipo, entidade, cenário, pré-condições, descrição, resultado esperado, prioridade, complexidade e esforço

### Testes de API (Automatizados)
- **Local**: `tests/api/automation/`
- **Framework**: Vitest
- **7 Suítes por entidade**:
  - `competencies.test.js` - CRUD de competências
  - `teams.test.js` - Criação e manipulação de times hierárquicos
  - `employees.test.js` - Gestão de colaboradores e gestores
  - `cycles.test.js` - Ciclos com validação de datas e pesos
  - `evaluations.test.js` - Geração e resposta de avaliações
  - `reports.test.js` - Relatórios por entidade e filtros
  - `health.test.js` - Health check da API
  
- **1 Suíte de Regressão**:
  - `regression/e2e.test.js` - Fluxo E2E completo de API

**Comando**: `npm run test` (executar) / `npm run test:ui` (visualizar relatório)

### Recursos Postman/Swagger
- **Local**: `tests/api/collection_postman/`
- **Arquivos**:
  - `Avaliação de Desempenho.postman_collection.json` - Collection com todos os endpoints
  - `Localhost.postman_environment.json` - Variáveis para ambiente local
  - `swagger.json` - Documentação OpenAPI da API

**Como usar**: Importe no Postman ou acesse via Swagger UI

## Testes Não Implementados - Justificativa

Durante o planejamento da estratégia de testes, alguns cenários foram prorizados. Abaixo estão os testes que não foram automatizados e as razões:

### 1. **Testes de Performance e Carga**

**O que não foi feito**: Testes de stress, limite de requisições simultâneas, tempo de resposta sob carga, otimização de queries, e comportamento do sistema com volume massivo de dados (1000+ competências, 10000+ avaliações, etc.)

**Justificativa**: Testes de performance exigem ambientes que espelhem as características de produção (infraestrutura, volume de dados, configurações de banco de dados, cache, etc.). Como o ambiente atual é local com dados em memória, não é possível reproduzir cenários realistas de produção. Testes de performance em ambiente inadequado geram resultados imprecisos e podem não detectar gargalos reais. O ideal é executar estes testes em ambientes de staging/pre-prod.

### 2. **Testes de Segurança Aprofundados**

**O que não foi feito**: Testes de autenticação/autorização avançados (JWT tampering, token expiration), autenticação multi-fator, rate limiting, CORS misconfiguration, CSRF prevention, data encryption at rest/in transit, auditoria de acesso, e testes de autorização granular em diferentes níveis de hierarquia.

**Justificativa**: Similar aos testes de performance, testes de segurança requerem infraestrutura de staging que simule produção. No contexto do projeto, não os temos. Os testes básicos de validação de dados (XSS, SQL injection) foram incluídos na matriz E2E para cobrir as validações de entrada mais críticas, mas testes de segurança em profundidade devem fazer parte de um processo contínuo com ferramentas especializadas (como Burp Suite) em um ambiente controlado.

### 3. **Testes Automatizados de Fluxos de Notas e Corner Cases**

**O que não foi feito**: Automação completa dos testes de cálculo de médias (simples e ponderadas) com múltiplas combinações de cenários, validação de corner cases com dados extremos (notas faltando, pesos inválidos), e testes de regressão visual para verificar cálculos em relatórios.

**Justificativa**: Devido ao escopo e timing da entrega, a priorização foi dada aos testes de integração API (CRUD das entidades) e à documentação de todos os cenários E2E possíveis. Os cenários de notas e pesos foram documentados na matriz E2E para execução manual e futura automação. Os testes de API cobrem os endpoints críticos de ciclos e avaliações, validando a geração e resposta.

**Se houvessem próximas etapas**: implementaria testes de performance com JMeter ou Locust, alguns security scannings com Burp Suite, e expandir a suíte de automação com casos de cálculo de notas e pesos.
