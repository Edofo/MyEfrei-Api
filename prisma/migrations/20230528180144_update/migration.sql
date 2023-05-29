/*
  Warnings:

  - You are about to alter the column `value` on the `Grade` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(5,2)`.

*/
-- AlterTable
ALTER TABLE "Grade" ADD COLUMN     "coef" DECIMAL(5,2),
ALTER COLUMN "value" DROP NOT NULL,
ALTER COLUMN "value" SET DATA TYPE DECIMAL(5,2);

-- AlterTable
ALTER TABLE "Subject" ADD COLUMN     "moduleUuid" TEXT;

-- CreateTable
CREATE TABLE "Module" (
    "uuid" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Module_pkey" PRIMARY KEY ("uuid")
);

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_moduleUuid_fkey" FOREIGN KEY ("moduleUuid") REFERENCES "Module"("uuid") ON DELETE SET NULL ON UPDATE CASCADE;
