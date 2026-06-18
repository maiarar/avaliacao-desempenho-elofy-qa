# Estratégia de Teste - Sistema de Avaliação de Desempenho

Nesse documento, detalharei a estratégia de teste que apliquei para o teste técnico prático de QA da Elofy, com foco em testes de API e automação, explanando qual lógica de teste apliquei.

## O que será entregue

### 1. Regras de negócio elencadas, para entender o contexto do sistema
- Para verificar as regras de negócio, acesse o documento [RegrasNegocio.md](./RegrasNegocio.md).

### 2. Testes a serem executados

**Definição de escopo de teste - E2E e integração (API)**

- Considerando a pirâmide de testes, o escopo dos testes envolverá a camada de testes de integração (plano de testes de API e automação do mesmo, conforme requerido), e cenários de testes E2E, com estimativa de esforço para cada um.
![imagem da pirâmide de testes, com foco em testes de API e automação](./img/test_pyramid.png)
- Para cada camadas (Integration e E2E), teremos testes funcionais, que validarão:
    1. happy path (elencando testes para smoke test, usados em regressão)
    2. regras de negócio [incluindo negativos]
    3. teste de borda/fronteira
- Testes que ficarão **fora do escopo**:
    1. Segurança, pois não tenho acesso à informações de autenticação e autorização do sistema, e nem acesso à ambientes de homologação/produção, que seriam necessários para validar isso
        > mas se eu tivesse acesso, eu aplicaria testes de segurança, como: SQL Injection (tentando inserir sql malicioso nos campos de texto), XSS (tentando inserir script malicioso via campos de entrada), CSRF (testando tokens de sessão por ex), Broken Authentication (verificando se consigo acessar recursos sem autenticação, alterar logins de outros users, se a sessão é invalidada depois do logout, etc), entre outros
    2. Performance, pois não tenho informações de carga de usuários, nem acesso à ambientes que seriam adequados para validar isso (como um de homologação "clone" de produção, com dados reais e volume de usuários real)
        > mas se fosse executar, aplicaria testes de carga, estresse e volume (principalmente na camada de integração), para verificar se o sistema aguenta a carga de usuários e se mantém a performance aceitável; caso haja perda de performance, aplicaria testes de estresse para verificar o ponto de quebra do sistema
    3. Acessibilidade, pois precisaria de informações de como o sistema é utilizado, e quais padrões de acessibilidade são requeridos
        > mas se fosse executar, aplicaria testes de acessibilidade, como: contraste de cores, tamanho de fontes, navegação por teclado, leitores de tela, integração com ferramentas de acessibilidade (como handtalk), entre outros

## Onde estão os testes

Para encontrar os testes, acesse o diretório [tests](./tests), onde estão organizados por tipo (integração e E2E) e por funcionalidade (ciclos, avaliações, etc).

TODO: finalizar a escrita do documento, detalhando os cenários de teste e a estimativa de esforço para cada um.