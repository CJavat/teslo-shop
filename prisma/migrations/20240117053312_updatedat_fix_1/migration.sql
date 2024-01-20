-- DropIndex
DROP INDEX "Country_name_key";

-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "isPaid" DROP DEFAULT;
