-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_event_type_id_fkey";

-- DropForeignKey
ALTER TABLE "Promotion" DROP CONSTRAINT "Promotion_pro_type_id_fkey";

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_event_type_id_fkey" FOREIGN KEY ("event_type_id") REFERENCES "Event_Type"("et_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_pro_type_id_fkey" FOREIGN KEY ("pro_type_id") REFERENCES "Promotion_Type"("pt_id") ON DELETE CASCADE ON UPDATE CASCADE;
