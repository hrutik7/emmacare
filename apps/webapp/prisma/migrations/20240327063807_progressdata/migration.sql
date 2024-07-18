-- DropForeignKey
ALTER TABLE "ProgressData" DROP CONSTRAINT "ProgressData_userId_fkey";

-- AlterTable
ALTER TABLE "ProgressData" ALTER COLUMN "userId" DROP NOT NULL,
ALTER COLUMN "dayname" DROP NOT NULL,
ALTER COLUMN "progress" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "ProgressData" ADD CONSTRAINT "ProgressData_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
