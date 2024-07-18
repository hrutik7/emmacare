-- CreateTable
CREATE TABLE "Improvement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "improvement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Improvement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NotImprovement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "notImprovement" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "NotImprovement_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Improvement" ADD CONSTRAINT "Improvement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NotImprovement" ADD CONSTRAINT "NotImprovement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
