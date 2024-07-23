/*
  Warnings:

  - Made the column `date` on table `Improvement` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Improvement" ALTER COLUMN "date" SET NOT NULL;
