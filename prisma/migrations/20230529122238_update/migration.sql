/*
  Warnings:

  - Made the column `moduleUuid` on table `Subject` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Subject" DROP CONSTRAINT "Subject_moduleUuid_fkey";

-- AlterTable
ALTER TABLE "Subject" ALTER COLUMN "moduleUuid" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Subject" ADD CONSTRAINT "Subject_moduleUuid_fkey" FOREIGN KEY ("moduleUuid") REFERENCES "Module"("uuid") ON DELETE RESTRICT ON UPDATE CASCADE;
