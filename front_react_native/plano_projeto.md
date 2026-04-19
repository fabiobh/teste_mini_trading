# Plano de Projeto – Frontend Mobile (Mini Binance App)

Este documento detalha o plano de implementação para o aplicativo móvel da plataforma de trading, desenvolvido em **React Native** com **Expo**. O foco é criar uma experiência de usuário premium, fluida e integrada ao backend Laravel já existente.

---

## 1. Stack Tecnológico

- **Framework**: React Native (Expo Managed Workflow)
- **Linguagem**: TypeScript
- **Navegação**: React Navigation (Stack & Bottom Tabs)
- **Estilização**: Tailwind (NativeWind v4)
- **Gerenciamento de Estado**: Context API
- **Requisições**: Axios
- **Ícones**: Lucide React Native

---

## 2. Estrutura de Pastas Implementada

```text
src/
  ├── components/      # Componentes reutilizáveis
  ├── constants/       # Cores e Configurações
  ├── contexts/        # AuthContext
  ├── routes/          # Configuração do React Navigation (Auth e App)
  ├── screens/         # Telas: Login, Register, Dashboard, Trade, History
  └── services/        # Configuração do Axios (api.ts)
```

---

## 3. Fases de Desenvolvimento

### Fase 1: Setup e Design System
- [x] Inicializar projeto Expo com TypeScript.
- [x] Configurar paleta de cores "Premium Dark Mode".
- [x] Configurar NativeWind v4.

### Fase 2: Autenticação (Auth Flow)
- [x] **LoginScreen**: Implementada com validações e feedback.
- [x] **RegisterScreen**: Cadastro de novos usuários funcional.
- [x] **AuthContext**: Persistência do token e gerenciamento de estado.
- [x] Fluxo de proteção de rotas (Roteador Central).

### Fase 3: Dashboard e Mercado (Home)
- [x] **DashboardScreen**: Card de saldo total e preço do BTC sincronizado.
- [x] Pull-to-refresh para atualizar valores.

### Fase 4: Trading (Compra e Venda)
- [x] **TradeScreen**: Interface de compra/venda com abas e cálculos dinâmicos.
- [x] Integração com endpoints `/trade/buy` e `/trade/sell`.

### Fase 5: Histórico de Transações e Testes
- [x] **HistoryScreen**: Lista de transações com indicadores visuais.
- [x] Configuração de Testes Automatizados com Jest e RTL.
- [x] Remoção do Reanimated para máxima compatibilidade.

---

## 4. Integração com o Backend

O app consome a API através do endereço configurado em `src/constants/config.ts`.
- O padrão é `http://192.168.0.71:8000/api` para garantir compatibilidade com dispositivos físicos e emuladores.
- Interceptador Axios injeta o header: `Authorization: Bearer {token}`.
- Tratamento de erros de saldo insuficiente e credenciais inválidas.
