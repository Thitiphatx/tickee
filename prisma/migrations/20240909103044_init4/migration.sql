/*
  Warnings:

  - Made the column `user_IDcard` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_birthdate` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_email` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_name` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_password` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_phone` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `user_role_id` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_user_role_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_IDcard" SET NOT NULL,
ALTER COLUMN "user_birthdate" SET NOT NULL,
ALTER COLUMN "user_email" SET NOT NULL,
ALTER COLUMN "user_name" SET NOT NULL,
ALTER COLUMN "user_password" SET NOT NULL,
ALTER COLUMN "user_phone" SET NOT NULL,
ALTER COLUMN "user_role_id" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "Role"("role_id") ON DELETE RESTRICT ON UPDATE CASCADE;
