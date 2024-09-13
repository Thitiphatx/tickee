-- AlterTable
ALTER TABLE "Seat_Dispatch" ADD COLUMN     "st_id" SERIAL NOT NULL,
ADD CONSTRAINT "Seat_Dispatch_pkey" PRIMARY KEY ("st_id");
