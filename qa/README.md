# Teste técnico prático Elofy - QA

> Documento criado para detalhar o teste técnico prático de QA da Elofy, com foco em testes de API e automação, explanando qual lógica de teste apliquei.

## Índice
- [Entregáveis](#entregáveis)
- [Diário do que foi realizado](#diário-do-que-foi-realizado-leiam-se-quiserem-entender-a-lógica-que-apliquei)
- [Entidades e regras](#entidades-e-regras)

## Entregáveis
1. Estratégia de teste com estimativa de esforço
2. Casos de teste estruturados
3. Plano de testes de API
4. Suíte de automação

## Diário do que foi realizado (leiam se quiserem entender a lógica que apliquei)
1. Instalação do Node com FnM (para gerenciar múltiplas versões do Node, sempre atualizadas)
2. `npm install` (para instalar as dependências do projeto) e `npm run dev` (para iniciar o projeto)
3. Desenho de rascunho de entidades enquanto lia a descrição do sistema, para entender o contexto e as regras de negócio


## Entidades e regras

Entendendo o contexto do sistema, as entidades e regras:
1. **Competências** — o que é avaliado (apenas um nome). São vinculadas aos ciclos.
2. **Times** — organograma hierárquico (um time pode ter um time superior, sem limite de profundidade).
3. **Colaboradores** — os avaliados. Cada um pertence a exatamente um time e pode ter zero ou um gestor direto (que também é um colaborador).
4. **Ciclos** — período + regras de uma rodada: nome, datas, times participantes e competências. Têm a opção de pesos por competência: quando ativa, a soma dos pesos deve ser exatamente 100. Configuração só é editável enquanto o ciclo está em rascunho (draft).
5. **Avaliações** — geradas automaticamente ao iniciar o ciclo. Cada colaborador dos times participantes recebe: (1) uma autoavaliação, (2) uma avaliação do gestor direto (se houver) e (3) uma avaliação de cada colega do mesmo time. São respondidas (notas de 1 a 5 por competência) somente enquanto a data atual estiver dentro do período. Ao final, o sistema calcula médias e emite relatórios.

### Principais regras de negócio:

- Geração de avaliações (ao iniciar o ciclo), para cada colaborador dos times participantes:
    - 1 autoavaliação (sempre);
    - 1 avaliação de gestor (só se tiver gestor);
    - 1 avaliação de par para cada colega do mesmo time direto, exceto ele mesmo e exceto o gestor.
- Responder só é permitido com a data atual dentro do período do ciclo (start_date ≤ hoje ≤ end_date, inclusive).
- Notas são inteiros de 1 a 5, uma por competência do ciclo.
- Pesos (opcional por ciclo): quando ativos, a soma dos pesos deve ser exatamente 100

## Cenáraios de teste

Para criar os cenários de teste, primeiro elenquei as regras de negócio e as entidades, para entender o contexto do sistema, e criei um documento, que serviria também para o time de negócio.

