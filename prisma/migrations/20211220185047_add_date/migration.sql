/*
  Warnings:

  - Added the required column `date` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "date" TIMESTAMP(3) NOT NULL;
