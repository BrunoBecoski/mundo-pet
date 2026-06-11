-- CreateTable
CREATE TABLE "appointments" (
    "id" TEXT NOT NULL,
    "ownerName" TEXT NOT NULL,
    "petName" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "scheduleAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "appointments_pkey" PRIMARY KEY ("id")
);
