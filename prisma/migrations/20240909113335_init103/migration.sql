/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `user_IDcard` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_birthdate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_email` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_password` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_phone` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `user_role_id` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Admin_Data` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Event_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Promotion` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Promotion_Type` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Receipt` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Role` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seat_Dispatch` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Seat_Type` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_event_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_producer_id_fkey";

-- DropForeignKey
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_pro_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_rec_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_rec_seat_id_fkey";

-- DropForeignKey
ALTER TABLE "Seat_Dispatch" DROP CONSTRAINT "Seat_Dispatch_seat_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Seat_Type" DROP CONSTRAINT "Seat_Type_event_seat_id_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_user_role_id_fkey";

-- DropIndex
DROP INDEX "User_user_email_key";

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
DROP COLUMN "user_IDcard",
DROP COLUMN "user_birthdate",
DROP COLUMN "user_email",
DROP COLUMN "user_id",
DROP COLUMN "user_name",
DROP COLUMN "user_password",
DROP COLUMN "user_phone",
DROP COLUMN "user_role_id",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "password" TEXT NOT NULL,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Admin_Data";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "Event_Type";

-- DropTable
DROP TABLE "Promotion";

-- DropTable
DROP TABLE "Promotion_Type";

-- DropTable
DROP TABLE "Receipt";

-- DropTable
DROP TABLE "Role";

-- DropTable
DROP TABLE "Seat_Dispatch";

-- DropTable
DROP TABLE "Seat_Type";

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
