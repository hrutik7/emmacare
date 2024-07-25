-- DropIndex
DROP INDEX "Introspection_introspectionDate_key";

-- AlterTable
ALTER TABLE "Introspection" ALTER COLUMN "introspectionDate" DROP NOT NULL;
