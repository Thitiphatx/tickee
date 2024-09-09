-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_user_role_id_fkey";

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "user_role_id" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_user_role_id_fkey" FOREIGN KEY ("user_role_id") REFERENCES "Role"("role_id") ON DELETE SET NULL ON UPDATE CASCADE;
