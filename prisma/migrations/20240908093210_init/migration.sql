/*
  Warnings:

  - Added the required column `event_seat_id` to the `Seat_Type` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Seat_Type" ADD COLUMN     "event_seat_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "Admin_Data" (
    "ad_id" SERIAL NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL,
    "banner_images" TEXT[],

    CONSTRAINT "Admin_Data_pkey" PRIMARY KEY ("ad_id")
);

-- AddForeignKey
ALTER TABLE "Seat_Type" ADD CONSTRAINT "Seat_Type_event_seat_id_fkey" FOREIGN KEY ("event_seat_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;
