/*
  Warnings:

  - You are about to drop the column `userId` on the `Relationship` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Relationship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Relationship` table without a default value. This is not possible if the table is not empty.
  - Added the required column `task` to the `Relationship` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Relationship" DROP CONSTRAINT "Relationship_userId_fkey";

-- AlterTable
ALTER TABLE "Relationship" DROP COLUMN "userId",
ADD COLUMN     "endTime" TEXT NOT NULL,
ADD COLUMN     "startTime" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN DEFAULT false,
ADD COLUMN     "task" TEXT NOT NULL,
ALTER COLUMN "relationshipId" DROP NOT NULL,
ALTER COLUMN "relationshipId" SET DATA TYPE TEXT;

-- AddForeignKey
ALTER TABLE "Relationship" ADD CONSTRAINT "Relationship_relationshipId_fkey" FOREIGN KEY ("relationshipId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
