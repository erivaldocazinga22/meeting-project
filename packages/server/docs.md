Uma estrutura de pastas modularizada, baseada em Domain-Driven Design (DDD), separa o código em camadas e contextos delimitados, promovendo a organização e a manutenção da aplicação. Essa abordagem facilita a colaboração entre equipes e a evolução do sistema.

## Como funciona na prática?

### 1. **Dominio é rei**

- `domain/` contém toda a lógica pura: entidades, value objects e interfaces dos repositórios.
    
- Nada aqui conhece a infra.
### 2. **Application orquestra**

- `use-cases/` são os únicos responsáveis pela execução da lógica.
    
- Recebem repositórios e entidades como dependência.
### 3. **Infra implementa**

- Implementações concretas dos repositórios (ex: Prisma), e serviços como e-mail, SMS, Redis.
### 4. **Interface adapta**

- Camada de `interface/http` expõe os controladores (Fastify), rotas e validações (ex: Zod).
    
- **Não se conecta diretamente com a aplicação.** Só com os use cases.

## Estrutura de pastas
src/
├── modules/
│   └── <modulo>/
│       ├── domain/
│       │   ├── entities/               # Regras e lógica do domínio (ex: User.ts)
│       │   ├── value-objects/          # Objetos de valor (ex: Email.ts)
│       │   └── repositories/           # Interfaces (ex: IUserRepository.ts)
│       │
│       ├── application/
│       │   ├── use-cases/              # Casos de uso (ex: CreateUserUseCase.ts)
│       │   └── dtos/                   # Data Transfer Objects
│       │
│       ├── infra/
│       │   ├── database/               # Implementações concretas de repositórios
│       │   │   ├── prisma/             # (ex: UserPrismaRepository.ts)
│       │   └── providers/              # Serviços externos (ex: MailProvider)
│       │
│       ├── interface/
│       │   ├── http/
│       │   │   ├── controllers/        # Fastify Handlers (ex: CreateUserController.ts)
│       │   │   ├── routes.ts           # Rotas do módulo
│       │   │   └── validators/         # Zod/Joi Schemas
│       │   └── mappers/                # Mapeamento de entidades ↔ resposta
│       │
│       └── tests/                      # Unitários por camada
│           ├── use-cases/
│           └── controllers/
│
├── shared/
│   ├── kernel/                         # Result, Either, BaseEntity, etc.
│   ├── container/                      # Injeção de dependência (ex: tsyringe)
│   └── infra/
│       ├── http/
│       │   ├── server.ts               # Criação do fastify + plugins globais
│       │   ├── app.ts                  # Registo de módulos (rotas + DI)
│       │   └── middlewares/
│       └── prisma/
│           ├── client.ts
│           └── index.ts
│
└── main.ts                             # Entry point da aplicação
