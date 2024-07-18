-- DropForeignKey
ALTER TABLE "Mind" DROP CONSTRAINT "Mind_mindId_fkey";

-- AlterTable
ALTER TABLE "Mind" ALTER COLUMN "mindId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Mind" ADD CONSTRAINT "Mind_mindId_fkey" FOREIGN KEY ("mindId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
