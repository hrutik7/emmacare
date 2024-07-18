/*
  Warnings:

  - You are about to drop the column `userId` on the `Mind` table. All the data in the column will be lost.
  - You are about to drop the `DailyMind` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `endTime` to the `Mind` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Mind` table without a default value. This is not possible if the table is not empty.
  - Added the required column `task` to the `Mind` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DailyMind" DROP CONSTRAINT "DailyMind_mindId_fkey";

-- DropForeignKey
ALTER TABLE "Mind" DROP CONSTRAINT "Mind_userId_fkey";

-- AlterTable
ALTER TABLE "Mind" DROP COLUMN "userId",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN DEFAULT false,
ADD COLUMN     "task" TEXT NOT NULL,
ALTER COLUMN "mindId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "DailyMind";

-- AddForeignKey
ALTER TABLE "Mind" ADD CONSTRAINT "Mind_mindId_fkey" FOREIGN KEY ("mindId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
