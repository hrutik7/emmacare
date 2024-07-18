/*
  Warnings:

  - A unique constraint covering the columns `[dayname]` on the table `ProgressData` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProgressData_dayname_key" ON "ProgressData"("dayname");
