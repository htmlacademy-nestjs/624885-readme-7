/*
  Warnings:

  - Added the required column `photo` to the `photo_post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "photo_post" ADD COLUMN     "photo" TEXT NOT NULL;
