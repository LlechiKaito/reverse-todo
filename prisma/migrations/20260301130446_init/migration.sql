-- CreateEnum
CREATE TYPE "ChallengeCategory" AS ENUM ('HEALTH', 'MONEY', 'TIME', 'HABIT', 'DIGITAL');

-- CreateEnum
CREATE TYPE "ChallengeStatus" AS ENUM ('ACTIVE', 'COMPLETED');

-- CreateTable
CREATE TABLE "challenges" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "reason" TEXT,
    "category" "ChallengeCategory" NOT NULL,
    "status" "ChallengeStatus" NOT NULL DEFAULT 'ACTIVE',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "challenges_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_logs" (
    "id" TEXT NOT NULL,
    "challenge_id" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "success" BOOLEAN NOT NULL,

    CONSTRAINT "daily_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "challenges_status_idx" ON "challenges"("status");

-- CreateIndex
CREATE UNIQUE INDEX "daily_logs_challenge_id_date_key" ON "daily_logs"("challenge_id", "date");

-- CreateIndex
CREATE INDEX "daily_logs_challenge_id_idx" ON "daily_logs"("challenge_id");

-- AddForeignKey
ALTER TABLE "daily_logs" ADD CONSTRAINT "daily_logs_challenge_id_fkey" FOREIGN KEY ("challenge_id") REFERENCES "challenges"("id") ON DELETE CASCADE ON UPDATE CASCADE;
