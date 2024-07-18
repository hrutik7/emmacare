-- DropForeignKey
ALTER TABLE "DailyFitness" DROP CONSTRAINT "DailyFitness_fitnessId_fkey";

-- DropForeignKey
ALTER TABLE "DailyRelation" DROP CONSTRAINT "DailyRelation_relationId_fkey";

-- AlterTable
ALTER TABLE "DailyFitness" ALTER COLUMN "fitnessId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "DailyRelation" ALTER COLUMN "relationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DailyRelation" ADD CONSTRAINT "DailyRelation_relationId_fkey" FOREIGN KEY ("relationId") REFERENCES "Relationship"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DailyFitness" ADD CONSTRAINT "DailyFitness_fitnessId_fkey" FOREIGN KEY ("fitnessId") REFERENCES "Fitness"("id") ON DELETE SET NULL ON UPDATE CASCADE;
