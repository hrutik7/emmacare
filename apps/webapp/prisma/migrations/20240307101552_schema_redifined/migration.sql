-- DropForeignKey
ALTER TABLE "DailyWealth" DROP CONSTRAINT "DailyWealth_wealthId_fkey";

-- AlterTable
ALTER TABLE "DailyFitness" ADD COLUMN     "status" BOOLEAN DEFAULT false,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "DailyRelation" ADD COLUMN     "status" BOOLEAN DEFAULT false,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "DailyWealth" ADD COLUMN     "status" BOOLEAN DEFAULT false,
ALTER COLUMN "wealthId" DROP NOT NULL,
ALTER COLUMN "startTime" SET DATA TYPE TEXT,
ALTER COLUMN "endTime" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "DailyWealth" ADD CONSTRAINT "DailyWealth_wealthId_fkey" FOREIGN KEY ("wealthId") REFERENCES "Wealth"("id") ON DELETE SET NULL ON UPDATE CASCADE;
