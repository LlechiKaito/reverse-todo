# CLAUDE.md - Reverse Todo Project

## Project Overview

フルスタックモノレポ Todo アプリケーション。

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: NestJS 10, TypeScript
- **Database**: PostgreSQL 16, Prisma ORM
- **Monorepo**: npm workspaces

## Project Structure

```
apps/web     - Next.js frontend (port 3000)
apps/api     - NestJS backend (port 3001)
packages/    - Shared packages (types, eslint-config, tsconfig)
prisma/      - Database schema and migrations
```

## Common Commands

```bash
npm install                  # Install all dependencies
docker compose up -d         # Start PostgreSQL
npm run db:migrate           # Run Prisma migrations
npm run db:seed              # Seed sample data
npm run dev:web              # Start frontend (localhost:3000)
npm run dev:api              # Start backend (localhost:3001)
npm run lint                 # Run ESLint
npm run format               # Check formatting with Prettier
```

## Architecture Patterns

### Frontend
- Container/Presentational pattern
- Feature-based organization (`features/todos/`)
- Custom hooks for logic encapsulation

### Backend (Layered Architecture)
- Controller → Service → Repository
- DTOs with class-validator
- Prisma for data access

## Database

PostgreSQL with 4 tables: User, Todo, Tag, TodoTag (many-to-many).
See `prisma/schema.prisma` for full schema.

## Environment Variables

Copy `.env.example` to `.env` for local development.
Key variables: `DATABASE_URL`, `API_PORT`, `NEXT_PUBLIC_API_URL`.
