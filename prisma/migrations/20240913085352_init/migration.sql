/*
  Warnings:

  - A unique constraint covering the columns `[seat_type_id]` on the table `Promotion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `event_intro` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `event_location` on the `Event` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `seat_type_id` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_surname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_name` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "event_intro" TEXT NOT NULL,
ALTER COLUMN "event_images" SET DATA TYPE TEXT,
DROP COLUMN "event_location",
ADD COLUMN     "event_location" JSONB NOT NULL;

-- AlterTable
ALTER TABLE "Promotion" ADD COLUMN     "seat_type_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_surname" TEXT NOT NULL,
ALTER COLUMN "user_name" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Promotion_seat_type_id_key" ON "Promotion"("seat_type_id");

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_seat_type_id_fkey" FOREIGN KEY ("seat_type_id") REFERENCES "Seat_Type"("seat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
