# Regras de Negócio - Sistema de Avaliação de Desempenho

Este documento detalha as regras de negócio do sistema de avaliação de desempenho, com base na descrição fornecida. Ele serve como referência para o time de desenvolvimento, time de qualidade e negócios, garantindo que todos tenham uma compreensão clara das entidades envolvidas e das regras que regem o funcionamento do sistema.

## Entidades

1. **Competências** — o que é avaliado (apenas um nome). São vinculadas aos ciclos.
2. **Times** — organograma hierárquico (um time pode ter um time superior, sem limite de profundidade).
3. **Colaboradores** — os avaliados. Cada um pertence a exatamente um time e pode ter zero ou um gestor direto (que também é um colaborador).
4. **Ciclos** — período + regras de uma rodada: nome, datas, times participantes e competências. Têm a opção de pesos por competência: quando ativa, a soma dos pesos deve ser exatamente 100. Configuração só é editável enquanto o ciclo está em rascunho (draft).
5. **Avaliações** — geradas automaticamente ao iniciar o ciclo. Cada colaborador dos times participantes recebe: (1) uma autoavaliação, (2) uma avaliação do gestor direto (se houver) e (3) uma avaliação de cada colega do mesmo time. São respondidas (notas de 1 a 5 por competência) somente enquanto a data atual estiver dentro do período. Ao final, o sistema calcula médias e emite relatórios.

