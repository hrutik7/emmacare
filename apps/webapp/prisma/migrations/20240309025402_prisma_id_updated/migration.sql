/*
  Warnings:

  - The primary key for the `AmbitiousGoal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DailyFitness` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DailyMind` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DailyRelation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `DailyWealth` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Fitness` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Introspection` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Mind` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `ProgressData` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Relationship` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Wealth` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "AmbitiousGoal" DROP CONSTRAINT "AmbitiousGoal_userId_fkey";

-- DropForeignKey
ALTER TABLE "DailyFitness" DROP CONSTRAINT "DailyFitness_fitnessId_fkey";

-- DropForeignKey
ALTER TABLE "DailyMind" DROP CONSTRAINT "DailyMind_mindId_fkey";

-- DropForeignKey
ALTER TABLE "DailyRelation" DROP CONSTRAINT "DailyRelation_relationId_fkey";

-- DropForeignKey
ALTER TABLE "DailyWealth" DROP CONSTRAINT "DailyWealth_wealthId_fkey";

-- DropForeignKey
ALTER TABLE "Fitness" DROP CONSTRAINT "Fitness_userId_fkey";

-- DropForeignKey
ALTER TABLE "Introspection" DROP CONSTRAINT "Introspection_userId_fkey";

-- DropForeignKey
ALTER TABLE "Mind" DROP CONSTRAINT "Mind_userId_fkey";

-- DropForeignKey
ALTER TABLE "ProgressData" DROP CONSTRAINT "ProgressData_userId_fkey";

-- DropForeignKey
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_userId_fkey";

-- DropForeignKey
ALTER TABLE "Wealth" DROP CONSTRAINT "Wealth_userId_fkey";

-- AlterTable
ALTER TABLE "AmbitiousGoal" DROP CONSTRAINT "AmbitiousGoal_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "AmbitiousGoal_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "AmbitiousGoal_id_seq";

-- AlterTable
ALTER TABLE "DailyFitness" DROP CONSTRAINT "DailyFitness_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "fitnessId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DailyFitness_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DailyFitness_id_seq";

-- AlterTable
ALTER TABLE "DailyMind" DROP CONSTRAINT "DailyMind_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "mindId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DailyMind_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DailyMind_id_seq";

-- AlterTable
ALTER TABLE "DailyRelation" DROP CONSTRAINT "DailyRelation_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "relationId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DailyRelation_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DailyRelation_id_seq";

-- AlterTable
ALTER TABLE "DailyWealth" DROP CONSTRAINT "DailyWealth_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "wealthId" SET DATA TYPE TEXT,
ADD CONSTRAINT "DailyWealth_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "DailyWealth_id_seq";

-- AlterTable
ALTER TABLE "Fitness" DROP CONSTRAINT "Fitness_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Fitness_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Fitness_id_seq";

-- AlterTable
ALTER TABLE "Introspection" DROP CONSTRAINT "Introspection_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Introspection_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Introspection_id_seq";

-- AlterTable
ALTER TABLE "Mind" DROP CONSTRAINT "Mind_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Mind_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Mind_id_seq";

-- AlterTable
ALTER TABLE "ProgressData" DROP CONSTRAINT "ProgressData_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "ProgressData_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "ProgressData_id_seq";

-- AlterTable
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Relationship_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Relationship_id_seq";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- AlterTable
ALTER TABLE "Wealth" DROP CONSTRAINT "Wealth_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "userId" SET DATA TYPE TEXT,
ADD CONSTRAINT "Wealth_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Wealth_id_seq";

-- AddForeignKey
ALTER TABLE "AmbitiousGoal" ADD CONSTRAINT "AmbitiousGoal_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProgressData" ADD CONSTRAINT "ProgressData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Mind" ADD CONSTRAINT "Mind_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyMind" ADD CONSTRAINT "DailyMind_mindId_fkey" FOREIGN KEY ("mindId") REFERENCES "Mind"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Wealth" ADD CONSTRAINT "Wealth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyWealth" ADD CONSTRAINT "DailyWealth_wealthId_fkey" FOREIGN KEY ("wealthId") REFERENCES "Wealth"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyRelation" ADD CONSTRAINT "DailyRelation_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "Relationship"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Fitness" ADD CONSTRAINT "Fitness_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyFitness" ADD CONSTRAINT "DailyFitness_fitnessId_fkey" FOREIGN KEY ("fitnessId") REFERENCES "Fitness"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Introspection" ADD CONSTRAINT "Introspection_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
