# Cidade Ativa

O **Cidade Ativa** é uma plataforma web e mobile voltada para a gestão inteligente de ocorrências urbanas[cite: 2]. O projeto visa organizar as demandas municipais, oferecer transparência no fluxo de atendimento e gerar métricas para a gestão pública[cite: 2].

Este projeto é fruto do **Projeto Integrador V** do curso de Engenharia de Software da **Unifio**[cite: 2].

---

## Funcionalidades Principais (MVP)

- **Cidadão**: Registro de ocorrências com geolocalização e fotos, confirmação de demandas existentes e acompanhamento de status[cite: 2, 5].
- **Gestor**: Triagem de ocorrências, atribuição de equipes, definição de prioridades e publicação de ações públicas[cite: 2, 5].
- **Atendente**: Visualização de demandas da equipe e registro de execução de ordens de serviço[cite: 2, 5].
- **Administrador**: Gerenciamento global de secretarias, equipes e usuários[cite: 2, 5].

---

## Tecnologias Utilizadas

- **Front-end**: React.js + Vite[cite: 5]
- **Comunicação**: Axios (API RESTful)[cite: 2, 5]
- **Estilização**: Tailwind CSS / CSS-in-JS[cite: 5]
- **Mapas**: Google Maps API[cite: 2, 5]
- **Gestão de Estado**: React Context API & Hooks[cite: 5]

---

## Estrutura de Pastas

O projeto segue o padrão **SoC (Separation of Concerns)** para garantir manutenibilidade[cite: 5]:

```text
cidade-ativa/
├── public/                 # Ativos estáticos globais
├── src/                    # Código-fonte principal
│   ├── assets/             # Logos e ícones de categorias
│   ├── components/         # Peças reutilizáveis (MapView, StatusBadge)
│   ├── pages/              # Módulos por ator (Home, Admin, Atendimento)
│   ├── services/           # Chamadas à API e integração externa
│   ├── context/            # Estado global e autenticação (RBAC)
│   ├── hooks/              # Lógica compartilhada (useAuth)
│   └── App.jsx             # Roteador central
└── .env                    # Variáveis de ambiente (Chaves de API)
```

---

## Padronização de Commits

Seguimos a convenção de **Conventional Commits** para manter o histórico organizado[cite: 5]:

- `feat`: Novas funcionalidades.
- `fix`: Correções de bugs.
- `docs`: Alterações em documentação.
- `style`: Ajustes visuais e de formatação.
- `refactor`: Melhorias na estrutura do código.

Exemplo: `git commit -m "feat: implementado mapa de calor na home"`[cite: 5].

---

## Como Executar o Projeto

1.  **Clone o repositório**:
    ```bash
    git clone https://github.com/SEU-USER/cidade-ativa.git
    ```
2.  **Instale as dependências**:
    ```bash
    npm install
    ```
3.  **Configure as variáveis de ambiente**:
    Crie um arquivo `.env` na raiz e adicione sua chave do Google Maps:
    ```env
    VITE_GOOGLE_MAPS_KEY=sua_chave_aqui
    ```
4.  **Inicie o servidor de desenvolvimento**:
    ```bash
    npm run dev
    ```

---

## Squad Cidade Ativa (PI V - 2026)

- Herbert de Sousa Santos[cite: 2]
- Lucas Adriano dos Santos[cite: 2]
- Matheus Gabriel Souza[cite: 2]
- Pedro Andreotti[cite: 2]
- Rízia Laiany da Silva[cite: 2]

---

**Instituição**: Centro Universitário de Ourinhos (Unifio)[cite: 2]  
**Curso**: Engenharia de Software[cite: 2]

```

```
