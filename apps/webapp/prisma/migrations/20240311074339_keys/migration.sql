/*
  Warnings:

  - You are about to drop the column `mindId` on the `Mind` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Mind" DROP CONSTRAINT "Mind_mindId_fkey";

-- AlterTable
ALTER TABLE "Mind" DROP COLUMN "mindId",
ADD COLUMN     "mindrelId" TEXT;

-- AddForeignKey
ALTER TABLE "Mind" ADD CONSTRAINT "Mind_mindrelId_fkey" FOREIGN KEY ("mindrelId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
