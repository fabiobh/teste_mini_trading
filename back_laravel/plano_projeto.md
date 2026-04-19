# Plano de Projeto – Plataforma de Trading (Mini Binance)

Este documento detalha o plano de implementação técnica para o desenvolvimento da plataforma de trading (Mini Binance), contemplando o backend em Laravel e o aplicativo móvel em React Native, alinhado com os requisitos de escopo fornecidos.

## 1. Arquitetura e Stack Tecnológico
*   **Backend:** Laravel 12 (API REST), PHP 8.2
*   **Banco de Dados:** SQLite para ambiente local/teste rápido
*   **Autenticação Backend:** Laravel Sanctum (Token-based)
*   **Frontend (App):** React Native (Expo recomendado pela agilidade)
*   **Navegação App:** React Navigation
*   **Gerenciamento de Estado App:** Context API ou Zustand(use o que for mais apropriado ao tamanho do projeto)
*   **Requisições App:** Axios

---

## 2. Modelagem de Dados (Backend - Laravel)

### Tabelas Principais (Migrations):
1.  **`users`**:
    *   `id`, `name`, `email`, `password`, `timestamps`
    *   **Extensão para Wallet (Carteira):** Adicionar colunas `balance_brl` (padrão 10000.00) e `balance_btc` (padrão 0.00000000).
2.  **`transactions`**:
    *   `id`, `user_id` (Foreign Key), `type` (enum: 'buy', 'sell'), `amount_btc` (decimal/float), `price_brl` (decimal/float), `total_brl` (decimal/float), `timestamps` (data da transação).

---

## 3. Fases de Desenvolvimento - Backend (Laravel)

### Fase 3.1: Configuração Inicial e Autenticação
*   [x] Iniciar projeto Laravel e configurar ambiente (`.env`).
*   [x] Instalar e configurar o **Laravel Sanctum**.
*   [x] Criar Controllers e Endpoints de Autenticação:
    *   `POST /register`: Validar dados, criar usuário (com saldo inicial R$ 10.000 e 0 BTC), gerar e retornar token.
    *   `POST /login`: Validar credenciais, gerar e retornar token Sanctum.
    *   `GET /me` (Protegido): Retornar informações básicas do usuário autenticado.

### Fase 3.2: Carteira e Mercado
*   [x] Criar Endpoint para Carteira:
    *   `GET /wallet` (Protegido): Retornar `balance_brl` e `balance_btc` do usuário logado.
*   [x] Criar Endpoint de Mercado (Preço Fake):
    *   `GET /market/btc`: Retornar um valor dinâmico randômico entre 200.000 e 300.000. *Dica: no controller, usar `rand(200000, 300000)` para gerar o preço daquele momento.*

### Fase 3.3: Módulo de Trading (Compra e Venda)
*   [x] Criar Endpoint de Compra:
    *   `POST /trade/buy` (Protegido): Recebe o valor em Reais a investir ou quantidade de BTC.
    *   **Regras:** Verificar preço atual do mercado para conversão. Validar se `balance_brl` $\ge$ custo. Deduzir `balance_brl`, incrementar `balance_btc`. Salvar registro em `transactions`.
*   [x] Criar Endpoint de Venda:
    *   `POST /trade/sell` (Protegido): Recebe quantidade de BTC para vender ou valor em Reais.
    *   **Regras:** Verificar preço de mercado. Validar se `balance_btc` $\ge$ venda. Deduzir `balance_btc`, incrementar `balance_brl`. Salvar registro em `transactions`.
*   **OBS**: Opcionalmente, travar transações dentro de um `DB::transaction()` para evitar condições de corrida (race conditions) e inconsistência de saldo.

### Fase 3.4: Histórico de Transações
*   [x] Criar Endpoint de Histórico:
    *   `GET /transactions` (Protegido): Retornar a lista de transações vinculadas ao `auth()->id()`, ordenadas pela data (`created_at` DESC).

---
