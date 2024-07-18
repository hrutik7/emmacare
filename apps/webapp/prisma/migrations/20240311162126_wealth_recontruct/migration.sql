/*
  Warnings:

  - You are about to drop the column `userId` on the `Wealth` table. All the data in the column will be lost.
  - You are about to drop the `DailyWealth` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endTime` to the `Wealth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Wealth` table without a default value. This is not possible if the table is not empty.
  - Added the required column `task` to the `Wealth` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DailyWealth" DROP CONSTRAINT "DailyWealth_wealthId_fkey";

-- DropForeignKey
ALTER TABLE "Wealth" DROP CONSTRAINT "Wealth_userId_fkey";

-- AlterTable
ALTER TABLE "Wealth" DROP COLUMN "userId",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN DEFAULT false,
ADD COLUMN     "task" TEXT NOT NULL,
ALTER COLUMN "wealthId" DROP NOT NULL,
ALTER COLUMN "wealthId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "DailyWealth";

-- AddForeignKey
ALTER TABLE "Wealth" ADD CONSTRAINT "Wealth_wealthId_fkey" FOREIGN KEY ("wealthId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
