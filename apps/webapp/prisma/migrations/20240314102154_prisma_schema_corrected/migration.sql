/*
  Warnings:

  - You are about to drop the `DailyFitness` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DailyRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DailyFitness" DROP CONSTRAINT "DailyFitness_fitnessId_fkey";

-- DropForeignKey
ALTER TABLE "DailyRelation" DROP CONSTRAINT "DailyRelation_relationId_fkey";

-- DropTable
DROP TABLE "DailyFitness";

-- DropTable
DROP TABLE "DailyRelation";
