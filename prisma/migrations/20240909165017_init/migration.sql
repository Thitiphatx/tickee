/*
  Warnings:

  - Added the required column `event_intro_discription` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `event_thumnails` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Made the column `event_type` on table `Event` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "event_details_image" TEXT[],
ADD COLUMN     "event_intro_discription" TEXT NOT NULL,
ADD COLUMN     "event_thumnails" TEXT NOT NULL,
ALTER COLUMN "event_type" SET NOT NULL;
