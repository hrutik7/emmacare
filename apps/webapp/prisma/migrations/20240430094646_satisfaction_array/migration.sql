/*
  Warnings:

  - The `satisfaction` column on the `Improvement` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Improvement" DROP COLUMN "satisfaction",
ADD COLUMN     "satisfaction" INTEGER[];
