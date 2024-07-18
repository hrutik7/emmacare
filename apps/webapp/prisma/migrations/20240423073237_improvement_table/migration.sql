/*
  Warnings:

  - You are about to drop the `NotImprovement` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `notImprove` to the `Improvement` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "NotImprovement" DROP CONSTRAINT "NotImprovement_userId_fkey";

-- AlterTable
ALTER TABLE "Improvement" ADD COLUMN     "notImprove" TEXT NOT NULL;

-- DropTable
DROP TABLE "NotImprovement";
