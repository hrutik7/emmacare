/*
  Warnings:

  - You are about to drop the column `data` on the `Fitness` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Introspection` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Mind` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `ProgressData` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Relationship` table. All the data in the column will be lost.
  - You are about to drop the column `ambitiousGoalTime` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `data` on the `Wealth` table. All the data in the column will be lost.
  - Added the required column `fitnessId` to the `Fitness` table without a default value. This is not possible if the table is not empty.
  - Added the required column `introspectionDate` to the `Introspection` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mindId` to the `Mind` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dayname` to the `ProgressData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `progress` to the `ProgressData` table without a default value. This is not possible if the table is not empty.
  - Added the required column `relationshipId` to the `Relationship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `wealthId` to the `Wealth` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fitness" DROP COLUMN "data",
ADD COLUMN     "fitnessId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Introspection" DROP COLUMN "data",
ADD COLUMN     "introspectionData" TEXT,
ADD COLUMN     "introspectionDate" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Mind" DROP COLUMN "data",
ADD COLUMN     "mindId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "ProgressData" DROP COLUMN "data",
ADD COLUMN     "dayname" TEXT NOT NULL,
ADD COLUMN     "progress" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Relationship" DROP COLUMN "data",
ADD COLUMN     "relationshipId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "ambitiousGoalTime";

-- AlterTable
ALTER TABLE "Wealth" DROP COLUMN "data",
ADD COLUMN     "wealthId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "AmbitiousGoal" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "goal" TEXT NOT NULL,
    "ambitiousGoalTime" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AmbitiousGoal_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyMind" (
    "id" SERIAL NOT NULL,
    "mindId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "task" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyMind_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyWealth" (
    "id" SERIAL NOT NULL,
    "wealthId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "task" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyWealth_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyRelation" (
    "id" SERIAL NOT NULL,
    "relationId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "task" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyRelation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DailyFitness" (
    "id" SERIAL NOT NULL,
    "fitnessId" INTEGER NOT NULL,
    "startTime" TIMESTAMP(3) NOT NULL,
    "endTime" TIMESTAMP(3) NOT NULL,
    "task" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DailyFitness_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AmbitiousGoal" ADD CONSTRAINT "AmbitiousGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyMind" ADD CONSTRAINT "DailyMind_mindId_fkey" FOREIGN KEY ("mindId") REFERENCES "Mind"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyWealth" ADD CONSTRAINT "DailyWealth_wealthId_fkey" FOREIGN KEY ("wealthId") REFERENCES "Wealth"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRelation" ADD CONSTRAINT "DailyRelation_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "Relationship"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyFitness" ADD CONSTRAINT "DailyFitness_fitnessId_fkey" FOREIGN KEY ("fitnessId") REFERENCES "Fitness"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
