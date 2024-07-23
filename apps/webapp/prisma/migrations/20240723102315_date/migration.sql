/*
  Warnings:

  - Added the required column `date` to the `Improvement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Improvement" ADD COLUMN     "date" TEXT NOT NULL;
