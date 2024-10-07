-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT,
    "email" TEXT,
    "password" TEXT,
    "image" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "idCard" TEXT,
    "mobile" TEXT,
    "birthDate" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "provider" TEXT NOT NULL DEFAULT 'credentials',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Receipt" (
    "rec_id" SERIAL NOT NULL,
    "rec_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "rec_quantity" INTEGER NOT NULL,
    "rec_customer_id" TEXT NOT NULL,
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
    "event_seat_id" INTEGER NOT NULL,

    CONSTRAINT "Seat_Type_pkey" PRIMARY KEY ("seat_id")
);

-- CreateTable
CREATE TABLE "Seat_Dispatch" (
    "st_id" SERIAL NOT NULL,
    "seat_type_id" INTEGER NOT NULL,
    "sd_max" INTEGER NOT NULL,
    "sd_current" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Seat_Dispatch_pkey" PRIMARY KEY ("st_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "event_id" SERIAL NOT NULL,
    "event_name" TEXT NOT NULL,
    "event_intro" TEXT NOT NULL,
    "event_description" TEXT NOT NULL,
    "event_images" TEXT NOT NULL,
    "event_start_date" TIMESTAMP(3) NOT NULL,
    "event_last_date" TIMESTAMP(3) NOT NULL,
    "event_location" TEXT NOT NULL,
    "event_seat_per_order" INTEGER NOT NULL,
    "producer_id" TEXT NOT NULL,
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
    "seat_type_id" INTEGER NOT NULL,
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

-- CreateTable
CREATE TABLE "Admin_Data" (
    "ad_id" SERIAL NOT NULL,
    "fee" DOUBLE PRECISION NOT NULL,
    "banner_images" TEXT[],

    CONSTRAINT "Admin_Data_pkey" PRIMARY KEY ("ad_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Seat_Dispatch_seat_type_id_key" ON "Seat_Dispatch"("seat_type_id");

-- CreateIndex
CREATE UNIQUE INDEX "Promotion_seat_type_id_key" ON "Promotion"("seat_type_id");

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_rec_customer_id_fkey" FOREIGN KEY ("rec_customer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Receipt" ADD CONSTRAINT "Receipt_rec_seat_id_fkey" FOREIGN KEY ("rec_seat_id") REFERENCES "Seat_Type"("seat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat_Type" ADD CONSTRAINT "Seat_Type_event_seat_id_fkey" FOREIGN KEY ("event_seat_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Seat_Dispatch" ADD CONSTRAINT "Seat_Dispatch_seat_type_id_fkey" FOREIGN KEY ("seat_type_id") REFERENCES "Seat_Type"("seat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_producer_id_fkey" FOREIGN KEY ("producer_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_event_type_id_fkey" FOREIGN KEY ("event_type_id") REFERENCES "Event_Type"("et_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_seat_type_id_fkey" FOREIGN KEY ("seat_type_id") REFERENCES "Seat_Type"("seat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Promotion" ADD CONSTRAINT "Promotion_pro_type_id_fkey" FOREIGN KEY ("pro_type_id") REFERENCES "Promotion_Type"("pt_id") ON DELETE RESTRICT ON UPDATE CASCADE;
