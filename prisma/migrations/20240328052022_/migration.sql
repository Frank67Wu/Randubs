/*
  Warnings:

  - A unique constraint covering the columns `[altName]` on the table `Character` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "altName" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Character_altName_key" ON "Character"("altName");
