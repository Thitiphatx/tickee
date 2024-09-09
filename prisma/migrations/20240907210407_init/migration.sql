/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_IDcard` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_birthdate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_phone` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_role_id` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "User_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "email",
DROP COLUMN "id",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "user_IDcard" TEXT NOT NULL,
ADD COLUMN     "user_birthdate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "user_email" TEXT NOT NULL,
ADD COLUMN     "user_id" SERIAL NOT NULL,
ADD COLUMN     "user_name" TEXT,
ADD COLUMN     "user_password" TEXT NOT NULL,
ADD COLUMN     "user_phone" TEXT NOT NULL,
ADD COLUMN     "user_role_id" INTEGER NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("user_id");

-- CreateTable
CREATE TABLE "Role" (
    "role_id" SERIAL NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "rec_id" SERIAL NOT NULL,
    "rec_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rec_quantity" INTEGER NOT NULL,
    "rec_customer_id" INTEGER NOT NULL,
    "rec_seat_id" INTEGER NOT NULL,

    CONSTRAINT "Receipt_pkey" PRIMARY KEY ("rec_id")
);

-- CreateTable
CREATE TABLE "Seat_Type" (
    "seat_id" SERIAL NOT NULL,
    "seat_name" TEXT NOT NULL,
    "seat_price" DOUBLE PRECISION NOT NULL,
    "seat_create_date" TIMESTAMP(3) NOT NULL,
    "seat_due_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Seat_Type_pkey" PRIMARY KEY ("seat_id")
);

-- CreateTable
CREATE TABLE "Seat_Dispatch" (
    "seat_type_id" INTEGER NOT NULL,
    "sd_max" INTEGER NOT NULL,
    "sd_current" INTEGER NOT NULL DEFAULT 0
);

-- CreateTable
CREATE TABLE "Event" (
    "event_id" SERIAL NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_description" TEXT NOT NULL,
    "event_images" JSONB NOT NULL,
    "event_start_date" TIMESTAMP(3) NOT NULL,
    "event_last_date" TIMESTAMP(3) NOT NULL,
    "event_location" TEXT NOT NULL,
    "event_seat_per_order" INTEGER NOT NULL,
    "producer_id" INTEGER NOT NULL,
    "event_type_id" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "Event_Type" (
    "et_id" SERIAL NOT NULL,
    "et_name" TEXT NOT NULL,

    CONSTRAINT "Event_Type_pkey" PRIMARY KEY ("et_id")
);

-- CreateTable
CREATE TABLE "Promotion" (
    "pro_id" SERIAL NOT NULL,
    "pro_description" TEXT NOT NULL,
    "pro_discount" DOUBLE PRECISION NOT NULL,
    "pro_start_date" TIMESTAMP(3) NOT NULL,
    "pro_last_date" TIMESTAMP(3) NOT NULL,
    "pro_type_id" INTEGER NOT NULL,

    CONSTRAINT "Promotion_pkey" PRIMARY KEY ("pro_id")
);

-- CreateTable
CREATE TABLE "Promotion_Type" (
    "pt_id" SERIAL NOT NULL,
    "pt_name" TEXT NOT NULL,

    CONSTRAINT "Promotion_Type_pkey" PRIMARY KEY ("pt_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Seat_Dispatch_seat_type_id_key" ON "Seat_Dispatch"("seat_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_rec_customer_id_fkey" FOREIGN KEY ("rec_customer_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_rec_seat_id_fkey" FOREIGN KEY ("rec_seat_id") REFERENCES "Seat_Type"("seat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat_Dispatch" ADD CONSTRAINT "Seat_Dispatch_seat_type_id_fkey" FOREIGN KEY ("seat_type_id") REFERENCES "Seat_Type"("seat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_event_type_id_fkey" FOREIGN KEY ("event_type_id") REFERENCES "Event_Type"("et_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_pro_type_id_fkey" FOREIGN KEY ("pro_type_id") REFERENCES "Promotion_Type"("pt_id") ON DELETE RESTRICT ON UPDATE CASCADE;
