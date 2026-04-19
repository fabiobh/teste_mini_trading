# Mini Binance App – Mobile (Frontend)

![Mini Binance Login Screen](./assets/screenshot-login.png)

Este é o aplicativo móvel da plataforma Mini Binance, desenvolvido com React Native e Expo, utilizando um design premium e responsivo.

## 📸 Demonstração da Interface Moderna

### 🏠 Dashboard
Dashboard premium com saldo em tempo real, cotação do BTC e atalhos rápidos.
![Dashboard](assets/screenshots/dashboard.png)

### 📈 Negociação (Trade)
Interface de compra e venda com cálculos dinâmicos e feedback visual.
| Compra (Buy) | Venda (Sell) |
| :---: | :---: |
| ![Trade Buy](assets/screenshots/trade-buy.png) | ![Trade Sell](assets/screenshots/trade-sell.png) |

### 📜 Histórico
Lista de transações detalhada com status e valores.
![History](assets/screenshots/history.png)

## 🚀 Como Executar o App

Para que o aplicativo funcione corretamente e consiga se comunicar com o backend Laravel, siga os passos abaixo:

### 1. Requisitos Próximos
- Certifique-se de que o **Backend Laravel** já está rodando (`php artisan serve`).
- O computador e o celular (ou emulador) devem estar na **mesma rede Wi-Fi**.

### 2. Configuração de Rede (IMPORTANTE)
Como o App roda em um ambiente separado do backend, você precisa configurar o IP da sua máquina:

1.  Descubra o IP local do seu computador:
    - No Windows: Use `ipconfig` no terminal e procure por `Endereço IPv4`.
    - No Mac/Linux: Use `ifconfig` ou `ip addr`.
2.  Abra o arquivo: `src/constants/config.ts`.
3.  Substitua o valor da constante `API_IP` pelo seu IP encontrado no passo 1.

```typescript
const API_IP = 'SEU_IP_AQUI'; // Ex: '192.168.1.15'
```

### 3. Instalação e Execução
No terminal, dentro da pasta `front_react_native`:

```bash
# Instalar dependências
npm install

# Iniciar o Expo
npm run start
```

### 4. Abrindo o App
- **Celular Físico**: Baixe o app **Expo Go**, abra a câmera do celular e escaneie o QR Code que aparecerá no terminal.
- **Emulador**: Pressione `a` para Android ou `i` para iOS no terminal onde o Expo está rodando.

---

## 🔑 Acesso ao App

Você pode criar uma nova conta diretamente no aplicativo na tela de Cadastro. Basta informar nome, e-mail e senha para começar a testar as funcionalidades com o saldo inicial padrão.

---

## 🧪 Testes Automatizados
Para rodar a suíte de testes de unidade e componentes:
```bash
npm test
```

---

## 🛠️ Tecnologias Utilizadas
- React Native / Expo
- NativeWind v4 (Tailwind CSS)
- Axios (Integração API)
- Lucide React Native (Ícones)
- Jest / React Testing Library (Testes)
