-- CreateTable
CREATE TABLE "Event" (
    "event_id" SERIAL NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_discription" TEXT NOT NULL,
    "event_image" TEXT NOT NULL,
    "event_create_date" TIMESTAMP(3) NOT NULL,
    "event_due_date" TIMESTAMP(3) NOT NULL,
    "event_location" TEXT NOT NULL,
    "event_seat_per_order" INTEGER NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);
