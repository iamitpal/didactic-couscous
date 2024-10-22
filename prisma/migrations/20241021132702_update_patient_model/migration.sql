-- AlterTable
ALTER TABLE "Patient" ALTER COLUMN "selectedDoctor" DROP NOT NULL,
ALTER COLUMN "selectedDoctor" SET DATA TYPE TEXT;
