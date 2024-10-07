-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_producer_id_fkey";

-- DropForeignKey
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_seat_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_rec_customer_id_fkey";

-- DropForeignKey
ALTER TABLE "Receipt" DROP CONSTRAINT "Receipt_rec_seat_id_fkey";

-- DropForeignKey
ALTER TABLE "Seat_Dispatch" DROP CONSTRAINT "Seat_Dispatch_seat_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Seat_Type" DROP CONSTRAINT "Seat_Type_event_seat_id_fkey";

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_rec_customer_id_fkey" FOREIGN KEY ("rec_customer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_rec_seat_id_fkey" FOREIGN KEY ("rec_seat_id") REFERENCES "Seat_Type"("seat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat_Type" ADD CONSTRAINT "Seat_Type_event_seat_id_fkey" FOREIGN KEY ("event_seat_id") REFERENCES "Event"("event_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat_Dispatch" ADD CONSTRAINT "Seat_Dispatch_seat_type_id_fkey" FOREIGN KEY ("seat_type_id") REFERENCES "Seat_Type"("seat_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_seat_type_id_fkey" FOREIGN KEY ("seat_type_id") REFERENCES "Seat_Type"("seat_id") ON DELETE CASCADE ON UPDATE CASCADE;
