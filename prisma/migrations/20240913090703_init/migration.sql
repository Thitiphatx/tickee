/*
  Warnings:

  - A unique constraint covering the columns `[seat_type_id]` on the table `Promotion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `event_intro` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `seat_type_id` to the `Promotion` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_surname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `user_role_id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_user_role_id_fkey";

-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "event_intro" TEXT NOT NULL,
ALTER COLUMN "event_images" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Promotion" ADD COLUMN     "seat_type_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "user_surname" TEXT NOT NULL,
ALTER COLUMN "user_name" SET DATA TYPE TEXT,
ALTER COLUMN "user_role_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Promotion_seat_type_id_key" ON "Promotion"("seat_type_id");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_seat_type_id_fkey" FOREIGN KEY ("seat_type_id") REFERENCES "Seat_Type"("seat_id") ON DELETE RESTRICT ON UPDATE CASCADE;
