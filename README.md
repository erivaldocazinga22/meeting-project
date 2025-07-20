# Meeting Project - API de Chamadas de Voz e Vídeo

![GitHub repo size](https://img.shields.io/github/repo-size/erivaldocazinga22/meeting-project?style=for-the-badge)
![GitHub language count](https://img.shields.io/github/languages/count/erivaldocazinga22/meeting-project?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/erivaldocazinga22/meeting-project?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/erivaldocazinga22/meeting-project?style=for-the-badge)
![GitHub pull requests](https://img.shields.io/github/issues-pr/erivaldocazinga22/meeting-project?style=for-the-badge)

> Projeto base para criação de uma API de videoconferência (estilo Zoom/Meet) com Fastify, TypeScript, Prisma, WebRTC e Socket.IO.

## 📌 Visão Geral

Este projeto oferece a base para desenvolvimento de aplicações de **chamadas de voz e vídeo em tempo real**, com foco em:

- Gerenciamento de salas virtuais
- Comunicação em tempo real via WebRTC
- Sinalização com WebSocket (Socket.IO)
- Autenticação com JWT
- Estrutura escalável e moderna com Fastify + Prisma

## 💻 Pré-requisitos

Antes de começar, certifique-se de que possui:

- Node.js (versão LTS)
- pnpm (recomendado) ou yarn
- Docker (para banco de dados e futura orquestração de media servers)
- Conhecimentos básicos sobre WebRTC, Fastify e Prisma

## 🚀 Instalação

### 1. Clone o repositório
```bash
git clone https://github.com/erivaldocazinga22/meeting-project.git
cd meeting-project
````

### 2. Instale as dependências

```bash
pnpm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo `.env.example` e renomeie para `.env`. Configure com seus dados:

```bash
cp .env.example .env
```

### 4. Inicie o banco de dados (PostgreSQL)

> Recomendado: usar Docker

```bash
docker compose up -d
```

### 5. Execute as migrations

```bash
pnpm prisma migrate dev
```

---

## ☕ Como usar

### Iniciar em modo desenvolvimento:

```bash
pnpm dev
```

### Iniciar em modo produção:

```bash
pnpm build && pnpm start
```

## 📦 Estrutura da API

| Rota              | Método | Descrição              |
| ----------------- | ------ | ---------------------- |
| `/rooms`          | POST   | Criar uma nova sala    |
| `/rooms/:id`      | GET    | Obter detalhes da sala |
| `/rooms/:id/join` | POST   | Entrar em uma sala     |
| `/users`          | POST   | Criar usuário          |
| `/sessions`       | POST   | Login/autenticação     |

**WebSocket:**
Canal de sinalização para negociação WebRTC entre os usuários.

## 🔧 Tecnologias Utilizadas

* **Fastify** – servidor rápido e extensível
* **Prisma ORM** – acesso a banco PostgreSQL
* **PostgreSQL** – persistência de usuários, salas e participantes
* **Socket.IO** – sinalização de vídeo e áudio via WebSocket
* **TypeScript** – código robusto e seguro
* **Zod** – validação de esquemas
* **JWT** – autenticação segura
* **Docker** – ambiente isolado para banco e dependências

## 🎯 Próximas Etapas

* Integração com media server (mediasoup ou LiveKit)
* Gravação de chamadas
* Transmissão ao vivo (opcional)
* Dashboard de analytics

## 🤝 Contribuindo

Quer contribuir? Siga os passos abaixo:

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Faça suas alterações
4. Commit: `git commit -m 'feat: minha feature'`
5. Push: `git push origin minha-feature`
6. Crie um Pull Request


## 👨‍💻 Desenvolvedor

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/erivaldocazinga22">
        <img src="https://github.com/erivaldocazinga22.png" width="100px;" alt="Foto do Erivaldo Caginga no GitHub"/><br>
        <sub><b>Erivaldo Caginga</b></sub>
      </a>
    </td>
  </tr>
</table>

---

## 📝 Licença

Este projeto está sob licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para mais detalhes.
