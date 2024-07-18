/*
  Warnings:

  - Added the required column `satisfaction` to the `Improvement` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Improvement" ADD COLUMN     "satisfaction" TEXT NOT NULL;
