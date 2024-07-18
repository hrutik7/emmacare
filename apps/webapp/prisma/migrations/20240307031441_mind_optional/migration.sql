-- DropForeignKey
ALTER TABLE "DailyMind" DROP CONSTRAINT "DailyMind_mindId_fkey";

-- AlterTable
ALTER TABLE "DailyMind" ALTER COLUMN "mindId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "DailyMind" ADD CONSTRAINT "DailyMind_mindId_fkey" FOREIGN KEY ("mindId") REFERENCES "Mind"("id") ON DELETE SET NULL ON UPDATE CASCADE;
