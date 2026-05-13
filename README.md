# Cidade Ativa

> Plataforma web para registro, acompanhamento e gestão de ocorrências urbanas municipais.

O **Cidade Ativa** conecta cidadãos e órgãos públicos em um fluxo transparente e organizado de atendimento às demandas da cidade — de buracos na rua a ações de saúde pública.

Este projeto é desenvolvido no **Projeto Integrador V** do curso de Engenharia de Software da **Unifio — Centro Universitário de Ourinhos**, 2026.

---

## Funcionalidades Principais (MVP)

| Perfil            | Funcionalidades                                                                                                         |
| ----------------- | ----------------------------------------------------------------------------------------------------------------------- |
| **Cidadão**       | Registrar ocorrências com foto e geolocalização, confirmar demandas existentes, acompanhar status e avaliar atendimento |
| **Gestor**        | Triagem de ocorrências, atribuição de equipes, definição de prioridades e publicação de ações públicas                  |
| **Atendente**     | Visualizar demandas da equipe, registrar execução e finalizar Ordens de Serviço                                         |
| **Administrador** | Gerenciamento global de secretarias, equipes e usuários                                                                 |

---

## Tecnologias Utilizadas

| Camada            | Tecnologia                      |
| ----------------- | ------------------------------- |
| **Framework**     | React 18 + Vite                 |
| **Roteamento**    | React Router DOM v6             |
| **UI Components** | shadcn/ui (Radix + preset Nova) |
| **Estilização**   | Tailwind CSS v4                 |
| **Ícones**        | Lucide React                    |
| **Fonte**         | Geist Variable                  |
| **HTTP Client**   | Axios                           |
| **Mapas**         | Leaflet (OpenStreetMap)         |
| **Estado Global** | React Context API + Hooks       |

---

## Estrutura de Pastas

O projeto segue o padrão **SoC (Separation of Concerns)**:

```text
cidade-ativa/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── badge.jsx
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   ├── sidebar.jsx
│   │   │   ├── table.jsx
│   │   │   └── ...
│   │   ├── MapView.jsx
│   │   ├── OccurrenceCard.jsx
│   │   ├── PrivateRoute.jsx
│   │   ├── Sidebar.jsx
│   │   └── StatusBadge.jsx
│   ├── context/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useAuth.js
│   │   └── use-mobile.js
│   ├── lib/
│   │   └── utils.js
│   ├── pages/
│   │   ├── Admin/
│   │   ├── Atendimento/
│   │   ├── Configuracoes/
│   │   ├── Dashboard/
│   │   ├── Home/
│   │   ├── Login/
│   │   ├── Notificacoes/
│   │   └── Ocorrencias/
│   ├── services/
│   │   ├── api.js
│   │   ├── auth.service.js
│   │   └── maps.service.js
│   ├── App.jsx
│   └── main.jsx
├── tailwind.config.js
├── vite.config.js
├── vercel.json
└── package.json

```

---

## Como Executar o Projeto

1. **Clone o repositório**:

```bash
git clone [https://github.com/SilveStredecendent/cidade-ativa.git](https://github.com/SilveStredecendent/cidade-ativa.git)
cd cidade-ativa

```

2. **Instale as dependências**:

```bash
npm install

```

3. **Configure as variáveis de ambiente**:

```bash
cp .env.example .env

```

Edite o `.env` e preencha a URL da sua API:

```env
VITE_API_BASE_URL=http://localhost:3000

```

4. **Inicie o servidor de desenvolvimento**:

```bash
npm run dev

```

---

## Fluxo de Trabalho Git

O projeto usa **GitFlow simplificado** com branches por funcionalidade:

| Branch             | Responsável | Módulo                           |
| ------------------ | ----------- | -------------------------------- |
| `feat/auth`        | —           | Login, AuthContext, PrivateRoute |
| `feat/home`        | —           | Home + mapa de ocorrências       |
| `feat/ocorrencias` | —           | CRUD de ocorrências              |
| `feat/atendimento` | —           | Dashboard + Ordens de Serviço    |
| `feat/admin`       | —           | Secretarias e equipes            |

### Padrão de Commits (Conventional Commits)

```bash
feat:     nova funcionalidade
fix:      correção de bug
docs:     alteração em documentação
style:    ajuste visual sem lógica
refactor: melhoria de estrutura
test:     testes

```

---

## Squad Cidade Ativa — PI V 2026

- Herbert de Sousa Santos
- Lucas Adriano dos Santos
- Matheus Gabriel Souza
- Pedro Andreotti
- Rízia Laiany da Silva

---

**Instituição**: Centro Universitario de Ourinhos (Unifio)

**Curso**: Engenharia de Software
