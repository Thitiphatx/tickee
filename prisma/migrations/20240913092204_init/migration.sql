-- AlterTable
ALTER TABLE "Seat_Dispatch" ADD COLUMN     "seat_dispatch_id" SERIAL NOT NULL,
ADD CONSTRAINT "Seat_Dispatch_pkey" PRIMARY KEY ("seat_dispatch_id");
