
# 💈 ClickBeard

Sistema completo de agendamento para barbearias, desenvolvido como teste técnico fullstack.

## 🧩 Tecnologias

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- MySQL
- JWT + Bcrypt
- MSC Pattern (Model-Service-Controller)

### Frontend
- React + Vite
- TypeScript
- TailwindCSS
- Axios
- React Router DOM
- Projeto UI com auxilio de IA 

---

## 📁 Estrutura de Pastas

```
ClickBeard_JoaoOliveira/
├── backend/
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── services/
│   │   ├── routes/
│   │   ├── middlewares/
│   │   └── server.ts
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── routes/
│   │   └── App.tsx
```

---

## 🚀 Como Rodar o Projeto

### Pré-requisitos

- Node.js v18+
- MySQL
- npm ou yarn

---

### 📦 Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

> Por padrão, a API roda em `http://localhost:3000`

---

### 💻 Frontend

```bash
cd frontend
npm install
npm run dev
```

> A interface estará disponível em `http://localhost:5173`

---

## 🔐 Usuários Demo

Para facilitar os testes:

```json
Admin:
  Email: admin@clickbeard.com
  Senha: password

Cliente:
  Email: client@example.com
  Senha: password
```

---

## 📌 Funcionalidades

### Autenticação
- Cadastro e login de usuários
- Controle por JWT (token no localStorage)

### Admin
- Gerenciar barbeiros
- Gerenciar especialidades
- Visualizar agendamentos

### Cliente
- Ver barbeiros e serviços
- Agendar horários disponíveis
- Cancelar agendamentos

---

## 🧠 Estrutura MSC

O backend segue a arquitetura MSC (Model-Service-Controller):

- **Model:** Prisma (e opcionalmente modelos manuais para coesão)
- **Service:** Regras de negócio
- **Controller:** Lida com `req` e `res`

---

## 🛠️ Scripts Úteis

```bash
# Backend
npm run dev             # inicia servidor
npx prisma studio       # visualiza DB
npx prisma migrate dev  # aplica migrações

# Frontend
npm run dev             # inicia interface
```

---


## 👨‍💻 Autor

🔗 www.linkedin.com/in/joão-victor-oliveira-2440231ab
📧  joaovictorgoncalvsoliveira450@gmail.com
📱 (27) 99604-3451
