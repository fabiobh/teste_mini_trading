# Mini Binance – Backend (Laravel 12)

Esta é uma aplicação de API REST para uma plataforma simplificada de trading de Bitcoin (BTC), construída como parte de um teste técnico.

## 🚀 Tecnologias Utilizadas

- **PHP 8.5** (8.2+ recomendado)
- **Laravel 12**
- **SQLite** (Banco de dados local)
- **Laravel Sanctum** (Autenticação baseada em Token)

> [!NOTE]
> **Decisão Técnica (Banco de Dados):** Optei pelo uso do **SQLite** em vez de PostgreSQL ou MySQL para agilizar o setup e a execução do teste. Por ser um ambiente de avaliação e não um sistema de produção real, o SQLite elimina a necessidade de configurar serviços externos, mantendo a portabilidade e facilidade de teste do projeto.

---

## ⚙️ Como rodar o projeto

### 1. Pré-requisitos
Certifique-se de ter o **PHP 8.2 ou superior** e o **Composer** instalados em sua máquina.

### 2. Instalação

1. Clone o repositório ou acesse a pasta do projeto:
   ```bash
   cd back_laravel
   ```

2. Instale as dependências:
   ```bash
   composer install
   ```

3. Configure o arquivo de ambiente:
   - Copie o `.env.example` para `.env`:
     ```bash
     cp .env.example .env
     ```
   - O projeto já vem configurado para usar **SQLite**. Certifique-se de que o arquivo `database/database.sqlite` existe (caso não exista, crie um arquivo vazio com esse nome).

4. Gere a chave da aplicação:
   ```bash
   php artisan key:generate
   ```

5. Execute as Migrations para criar as tabelas:
   ```bash
   php artisan migrate
   ```

### 3. Executando o Servidor
Para iniciar a API localmente:
```bash
php artisan serve
```
A API estará disponível em `http://127.0.0.1:8000`.

---

## 🧪 Como rodar os testes

### Testes Automatizados (PHPUnit/Pest)
Para rodar a suíte de testes do Laravel:
```bash
php artisan test
```

### Testes Manuais (API)
Você pode testar os endpoints usando ferramentas como **Postman**, **Insomnia** ou via **cURL**.

**Endpoints Principais:**
- `POST /api/register` - Criar nova conta (Ganha R$ 10.000,00 iniciais).
- `POST /api/login` - Obter Token de acesso.
- `GET /api/me` - Ver perfil (Requer Token).
- `GET /api/wallet` - Ver saldos de BRL e BTC (Requer Token).
- `GET /api/market/btc` - Ver preço atual do BTC (Fake).
- `POST /api/trade/buy` - Comprar BTC usando BRL.
- `POST /api/trade/sell` - Vender BTC por BRL.
- `GET /api/transactions` - Ver histórico das suas operações.

---

## 💡 Sugestão de Teste (Fluxo Completo)

1. **Registre-se**: Crie um usuário no `/api/register`.
2. **Cheque seu saldo**: No `/api/wallet` você deve ver R$ 10.000,00.
3. **Veja o preço**: No `/api/market/btc` veja quanto está custando o BTC agora.
4. **Compre**: Use o `/api/trade/buy` enviando um JSON `{"amount_brl": 5000}` para investir R$ 5.000,00.
5. **Venda**: Use o `/api/trade/sell` enviando o `amount_btc` que você comprou para ver o saldo em Reais retornar.
6. **Histórico**: Veja tudo o que aconteceu no `/api/transactions`.

---

*Desenvolvido como projeto de teste técnico para plataforma de trading.*
