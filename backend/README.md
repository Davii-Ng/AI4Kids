# AI4Kids Backend

Node.js TypeScript backend skeleton with SQLite and Prisma.

## Setup

```bash
cp .env.example .env
yarn install
yarn prisma:migrate --name init
yarn db:seed
yarn dev
```

## Endpoints

- `GET /health`
- `GET /missions`
- `GET /classes/:code/report`
