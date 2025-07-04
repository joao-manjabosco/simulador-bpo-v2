# Simulador BPO com Acesso Vitalício

Este projeto é um simulador de precificação de serviços BPO com sistema de pagamento integrado via Stripe e autenticação via Firebase.

## 🚀 Funcionalidades

### ✅ Página de Vendas
- Landing page profissional com descrição do produto
- Preço destacado (R$ 497)
- Botão de compra integrado com Stripe Checkout
- Design responsivo e moderno

### ✅ Sistema de Pagamento
- Integração com Stripe Checkout
- Redirecionamento automático após pagamento
- Página de confirmação de sucesso

### ✅ Autenticação de Usuários
- Sistema de registro e login via Firebase Auth
- Proteção de rotas para área restrita
- Verificação de status de pagamento
- Logout seguro

### ✅ Simulador Profissional
- Cálculo de precificação baseado em critérios específicos
- Score gamificado (Cliente Ideal, Médio, Difícil)
- Customização de equipe com impacto no preço
- Interface intuitiva e profissional

## 🛠️ Tecnologias Utilizadas

- **Frontend**: React 18 + TypeScript + Vite
- **Autenticação**: Firebase Auth
- **Banco de Dados**: Firestore
- **Pagamentos**: Stripe Checkout
- **Roteamento**: React Router DOM
- **Estilização**: CSS customizado (simulando Tailwind)

## 📦 Estrutura do Projeto

```
src/
├── components/
│   └── ProtectedRoute.tsx    # Componente de proteção de rotas
├── hooks/
│   └── useAuth.ts           # Hook de autenticação
├── pages/
│   ├── index.tsx            # Página de vendas
│   ├── login.tsx            # Página de login
│   ├── register.tsx         # Página de registro
│   ├── sucesso.tsx          # Página de sucesso pós-pagamento
│   └── simulador.tsx        # Simulador protegido
├── styles/
│   └── index.css            # Estilos globais
├── firebase.ts              # Configuração do Firebase
└── App.tsx                  # Componente principal com rotas
```

## 🔧 Configuração e Instalação

### 1. Pré-requisitos
- Node.js 18+ instalado
- Conta no Firebase
- Conta no Stripe

### 2. Instalação das Dependências
```bash
npm install
```

### 3. Configuração do Firebase

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Ative Authentication (Email/Password)
3. Ative Firestore Database
4. Copie as configurações do projeto
5. Substitua as configurações em `src/firebase.ts`:

```typescript
const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-projeto.firebaseapp.com",
  projectId: "seu-projeto-id",
  storageBucket: "seu-projeto.appspot.com",
  messagingSenderId: "123456789",
  appId: "seu-app-id"
};
```

### 4. Configuração do Stripe

1. Crie uma conta no [Stripe](https://stripe.com/)
2. Acesse o Dashboard e crie um produto
3. Configure o preço (R$ 497)
4. Gere o link do Stripe Checkout
5. Substitua a URL em `src/pages/index.tsx`:

```typescript
const handleStripeCheckout = () => {
  window.location.href = "https://buy.stripe.com/sua-url-aqui";
};
```

6. Configure o redirecionamento de sucesso no Stripe para:
```
https://seu-dominio.com/sucesso
```

### 5. Executar o Projeto

#### Desenvolvimento
```bash
npm run dev
```
Acesse: `http://localhost:5173`

#### Build para Produção
```bash
npm run build
```

#### Preview da Build
```bash
npm run preview
```

## 🌐 Deploy

### Vercel (Recomendado)

1. Faça upload do projeto para GitHub
2. Conecte sua conta Vercel ao GitHub
3. Importe o projeto no Vercel
4. Configure as variáveis de ambiente (se necessário)
5. Deploy automático!

### Netlify

1. Faça build do projeto: `npm run build`
2. Faça upload da pasta `dist` no Netlify
3. Configure redirects para SPA se necessário

## 🔐 Fluxo de Funcionamento

### 1. Compra
1. Usuário acessa a página inicial
2. Clica em "Comprar Agora"
3. É redirecionado para Stripe Checkout
4. Realiza o pagamento
5. É redirecionado para `/sucesso`

### 2. Criação de Conta
1. Na página de sucesso, clica em "Criar Conta"
2. Preenche dados de registro
3. Conta é criada com `hasPaid: true`
4. É redirecionado para o simulador

### 3. Acesso Futuro
1. Usuário acessa `/login`
2. Faz login com suas credenciais
3. É redirecionado para o simulador

### 4. Proteção
- Tentativas de acessar `/simulador` sem login redirecionam para `/login`
- Usuários sem pagamento veem tela de acesso restrito

## 🎯 Próximos Passos (Opcionais)

### Webhooks do Stripe
Para maior segurança, implemente webhooks do Stripe para:
- Verificar pagamentos em tempo real
- Atualizar status de usuários automaticamente
- Enviar emails de confirmação

### Melhorias de UX
- Loading states mais elaborados
- Notificações toast
- Recuperação de senha
- Validação de email

### Analytics
- Google Analytics
- Tracking de conversões
- Métricas de uso do simulador

## 📞 Suporte

Para dúvidas sobre configuração ou problemas técnicos, consulte:
- [Documentação do Firebase](https://firebase.google.com/docs)
- [Documentação do Stripe](https://stripe.com/docs)
- [Documentação do React](https://react.dev/)

---

**Desenvolvido com ❤️ para otimizar a precificação de serviços BPO**

