/*
  Warnings:

  - Added the required column `event_intro_description` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "event_intro_description" TEXT NOT NULL,
ALTER COLUMN "event_description" SET DATA TYPE TEXT;
