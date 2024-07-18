/*
  Warnings:

  - Changed the type of `satisfaction` on the `Improvement` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Improvement" DROP COLUMN "satisfaction",
ADD COLUMN     "satisfaction" INTEGER NOT NULL;
