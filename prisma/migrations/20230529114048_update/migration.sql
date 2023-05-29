/*
  Warnings:

  - You are about to drop the column `teacherUuid` on the `Class` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Class" DROP CONSTRAINT "Class_teacherUuid_fkey";

-- AlterTable
ALTER TABLE "Class" DROP COLUMN "teacherUuid";
