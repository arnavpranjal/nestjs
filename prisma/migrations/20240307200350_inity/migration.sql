/*
  Warnings:

  - You are about to drop the column `files` on the `deal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "deal" DROP COLUMN "files",
ADD COLUMN     "file" TEXT;
