# 🧑‍💻 Blog Dev

>  

O **Blog Dev** é uma plataforma de conteúdo criada para compartilhar experiências reais durante a construção de projetos, experimentos com tecnologias, estudos, decisões de arquitetura, erros, acertos e descobertas no desenvolvimento de software.

A proposta não é criar apenas mais um blog genérico de tecnologia. A ideia é **construir, experimentar e documentar o processo**.

---

## 🚀 Sobre o projeto

O Blog Dev nasceu da vontade de transformar a jornada de desenvolvimento em conteúdo. Em vez de simplesmente publicar artigos como:

❌ *"Como usar Next.js"*

A proposta é mostrar:

✅ *"Construí uma aplicação usando Next.js. Essas foram minhas decisões, os problemas que encontrei, o que funcionou e o que eu faria diferente."*

O projeto funciona como uma espécie de **laboratório público de desenvolvimento**. Aqui podem surgir:

* 🚧 Projetos sendo construídos do zero
* 🧪 Experimentos com novas tecnologias
* 🤖 Inteligência artificial aplicada a problemas reais
* ⚔️ Comparações entre ferramentas e stacks
* 💀 Bugs, erros e decisões que deram errado
* 💡 Ideias de produtos e SaaS
* 🔍 Estudos sobre como tecnologias funcionam
* 📊 Testes para descobrir se determinada ferramenta realmente vale a pena
* 🧠 Aprendizados adquiridos durante o desenvolvimento

---

## 🎯 Objetivos

O projeto possui três objetivos principais:

1. **Documentar:** Registrar decisões, experimentos e aprendizados durante o desenvolvimento de software.
2. **Compartilhar:** Transformar experiências práticas em conteúdo útil para outros desenvolvedores.
3. **Evoluir:** Usar o próprio Blog Dev como um projeto real para experimentar novas tecnologias, arquiteturas e práticas de engenharia de software.

---

## 🧪 Filosofia

O Blog Dev segue uma ideia simples: **Menos teoria isolada. Mais experimentação.**

Sempre que possível, os conteúdos devem partir de um problema ou experimento real. O processo esperado é:

```text
Problema
   ↓
Hipótese
   ↓
Implementação
   ↓
Experimentação
   ↓
Problemas encontrados
   ↓
Resultado
   ↓
Conclusão
```

Isso permite que os artigos mostrem não apenas *o que fazer*, mas também *por que fazer* e *o que acontece* quando colocamos a solução em prática.

---

## 📚 Conteúdo

O conteúdo do Blog Dev é organizado nas seguintes categorias:

| Categoria | Descrição |
| :--- | :--- |
| 🚧 **Construindo** | Projetos acompanhados desde a ideia até a implementação |
| 🧪 **Laboratório** | Experimentos com tecnologias e ferramentas |
| 🤖 **IA na Prática** | Inteligência artificial aplicada a problemas reais |
| ⚔️ **Batalha de Stack** | Comparações entre tecnologias |
| 💀 **Deu Ruim** | Bugs, decisões ruins e problemas encontrados |
| 💡 **Ideias** | Produtos, SaaS e oportunidades |
| 🔍 **Por Dentro** | Funcionamento interno de tecnologias |
| 📊 **Vale a Pena?** | Testes e avaliações práticas |
| 🧠 **Aprendizados** | Conhecimentos adquiridos durante projetos |

---

## 🛠️ Stack

O projeto utiliza tecnologias modernas do ecossistema JavaScript/TypeScript:

### Front-end
* [Next.js](https://nextjs.org/)
* [React](https://react.dev/)
* [TypeScript](https://www.typescriptlang.org/)
* [Tailwind CSS](https://tailwindcss.com/)
* [shadcn/ui](https://ui.shadcn.com/)

### Back-end & Aplicação
* Next.js App Router
* React Server Components
* Server Actions
* [Zod](https://zod.dev/)

### Banco de Dados
* [PostgreSQL](https://www.postgresql.org/)
* [Neon DB](https://neon.tech/)
* [Prisma ORM](https://www.prisma.io/)

### Ferramentas
* Git & GitHub
* ESLint
* Prettier

---

## 🏗️ Arquitetura

A aplicação utiliza o **App Router** do Next.js e prioriza *Server Components* e *Server Actions* sempre que fizer sentido. A comunicação com o banco acontece através do Prisma ORM:

```text
┌─────────────────────────┐
│        Browser          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│        Next.js          │
│      App Router         │
├─────────────────────────┤
│ Server Components       │
│ Server Actions          │
│ Route Handlers          │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│         Prisma          │
│           ORM           │
└────────────┬────────────┘
             │
             ▼
┌─────────────────────────┐
│          Neon           │
│       PostgreSQL        │
└─────────────────────────┘
```

---

## 📁 Estrutura

A estrutura principal do projeto segue uma organização por responsabilidades:

```text
src/
├── app/
│   ├── (site)/
│   │   ├── page.tsx
│   │   ├── blog/
│   │   ├── categorias/
│   │   └── sobre/
│   │
│   ├── admin/
│   │   ├── page.tsx
│   │   ├── posts/
│   │   └── categorias/
│   │
│   ├── api/
│   ├── layout.tsx
│   └── globals.css
│
├── actions/
│
├── components/
│   ├── ui/
│   ├── blog/
│   ├── admin/
│   └── layout/
│
├── lib/
│   ├── prisma.ts
│   ├── utils.ts
│   └── validations/
│
└── types/

prisma/
└── schema.prisma
```

---

## ⚙️ Executando localmente

### 1. Clone o repositório
```bash
git clone https://github.com/andre-0303/blog-dev.git
cd blog-dev
```

### 2. Instale as dependências
```bash
pnpm install
```

### 3. Configure as variáveis de ambiente
Crie um arquivo `.env` na raiz do projeto e adicione a conexão do banco:

```env
DATABASE_URL="sua_connection_string_do_neon"
```

### 4. Execute as migrations e gere o cliente do Prisma
```bash
npx prisma migrate dev
npx prisma generate
```

### 5. Execute o projeto em modo de desenvolvimento
```bash
npm run dev
```

O projeto estará disponível em: `http://localhost:3000`

---

## 🗄️ Banco de dados

O banco utiliza **PostgreSQL** hospedado no **Neon**. A modelagem inicial contempla entidades como:

```text
User
 │
 └───< Post >─── Category
          │
          └───< PostTag >─── Tag
```

Um post possui as seguintes propriedades:
* Autor (`User`)
* Categoria (`Category`)
* Tags (`Tag[]` via `PostTag`)
* Título
* Slug
* Resumo
* Conteúdo
* Imagem de capa
* Status de publicação (Rascunho / Publicado)
* Data de criação e atualização

---

## 🔐 Área administrativa

O projeto possui uma área administrativa responsável pelo gerenciamento de conteúdo.

```text
Dashboard
   │
   ├── Posts
   │   ├── Criar
   │   ├── Editar
   │   ├── Excluir
   │   ├── Publicar
   │   └── Rascunhos
   │
   ├── Categorias
   │
   └── Tags
```

As responsabilidades da aplicação são estritamente separadas:

* `/site` → Leitura e descoberta de conteúdo pública.
* `/admin` → Criação, edição e gerenciamento de conteúdo restrito.

---

## 📈 Roadmap

O projeto será desenvolvido de forma incremental:

### 1. MVP
- [x] Configuração inicial do Next.js
- [x] Tailwind CSS + shadcn/ui
- [x] Integração Neon PostgreSQL + Prisma
- [x] Página inicial
- [x] Listagem de posts
- [x] Página individual do post
- [x] Listagem por Categorias
- [ ] Listagem por Tags *(as tags são cadastradas e ligadas aos posts, mas ainda não têm página pública)*
- [ ] Sistema de busca
- [x] SEO básico

### 2. CMS
- [x] Autenticação
- [x] Dashboard administrativo
- [x] CRUD de Posts (Criar, Editar, Excluir, Rascunhos, Publicação)
- [x] Gerenciamento de Categorias e Tags
- [x] Editor Markdown integrado

### 3. Evolução
- [ ] Upload de imagens *(o campo `coverImage` existe no schema e ainda não é usado)*
- [x] Preview de artigos antes de publicar
- [ ] Posts relacionados
- [x] Geração de Sitemap
- [ ] Geração de RSS
- [x] Metadados Open Graph dinâmicos
- [ ] Analytics
- [ ] Newsletter
- [x] Sistema de Comentários
- [ ] Sistema de permissões *(existe um único papel: quem entra no `/admin` pode tudo)*
- [ ] Agendamento de publicação

### 4. Entregue fora do plano original

Coisas que não estavam na lista e acabaram entrando pelo caminho:

- [x] Identidade visual própria — paleta de acento único, tipografia e componentes
- [x] Modo escuro com switch no header, sem piscar no carregamento
- [x] Renderização estática com ISR e revalidação disparada pelo `/admin`
- [x] Páginas de 404 e de erro dentro da identidade do site
- [x] Limite de tentativas no login e nos comentários
- [x] JSON-LD (`BlogPosting` e `Blog`) e imagens de Open Graph geradas por artigo
- [x] Cabeçalhos de segurança e testes das funções puras (`pnpm test`)
- [x] `DEPLOY.md` com variáveis, ordem do build e criação do primeiro usuário


---

## 🧠 O que este projeto representa

O Blog Dev não é apenas um projeto para demonstrar CRUD. Ele serve como um **ambiente real para experimentar conceitos de engenharia de software na prática**, incluindo:

* Arquitetura de aplicações Next.js
* Server Components & Server Actions
* Modelagem relacional e ORM
* Validação de dados de ponta a ponta
* Autenticação e Autorização
* SEO, Performance e Acessibilidade
* Design de interfaces e Design System
* Segurança, Deploy e Observabilidade

O próprio projeto pode mudar conforme novos problemas e aprendizados forem encontrados — essa é uma característica totalmente intencional.

---

## 🤝 Contribuição

O projeto é principalmente um laboratório pessoal, mas sugestões, ideias e discussões são sempre bem-vindas. Se encontrar algum problema ou tiver uma sugestão:

1. Abra uma **Issue**.
2. Descreva o problema ou proposta com clareza.
3. Explique, quando possível, a motivação por trás da sugestão.

---

## 📄 Licença

Este projeto está sob a licença definida no arquivo [LICENSE](LICENSE).

---

## 👨‍💻 Autor

Desenvolvido por **André Bandeira**.

O Blog Dev faz parte da jornada de aprendizado, experimentação e construção de projetos na área de desenvolvimento de software.

> *Construir. Experimentar. Errar. Aprender. Documentar. Evoluir.*
> 
> **Blog Dev — tecnologia vista através da prática.**