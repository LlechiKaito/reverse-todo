FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/tsconfig/package.json ./packages/tsconfig/
COPY packages/eslint-config/package.json ./packages/eslint-config/
COPY packages/shared-types/package.json ./packages/shared-types/

RUN npm ci

COPY packages/ ./packages/
COPY prisma/ ./prisma/
COPY apps/api/ ./apps/api/

RUN npx prisma generate
RUN npm run build -w apps/api

EXPOSE 3001
CMD sh -c "npx prisma migrate deploy && npx prisma db seed && node apps/api/dist/main.js"
