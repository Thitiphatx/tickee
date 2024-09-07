-- CreateTable
CREATE TABLE "Event" (
    "event_id" SERIAL NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_discription" TEXT,
    "event_image" TEXT NOT NULL,
    "event_create_date" TEXT NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Event_event_name_key" ON "Event"("event_name");
