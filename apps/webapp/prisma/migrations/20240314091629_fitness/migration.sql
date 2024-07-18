/*
  Warnings:

  - You are about to drop the column `fitnessId` on the `Fitness` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Fitness` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Fitness` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Fitness` table without a default value. This is not possible if the table is not empty.
  - Added the required column `task` to the `Fitness` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Fitness" DROP CONSTRAINT "Fitness_userId_fkey";

-- AlterTable
ALTER TABLE "Fitness" DROP COLUMN "fitnessId",
DROP COLUMN "userId",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "fitId" TEXT,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN DEFAULT false,
ADD COLUMN     "task" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Fitness" ADD CONSTRAINT "Fitness_fitId_fkey" FOREIGN KEY ("fitId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
