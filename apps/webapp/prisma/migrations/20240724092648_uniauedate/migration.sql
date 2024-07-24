/*
  Warnings:

  - A unique constraint covering the columns `[introspectionDate]` on the table `Introspection` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Introspection_introspectionDate_key" ON "Introspection"("introspectionDate");
