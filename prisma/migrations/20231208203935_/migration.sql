/*
  Warnings:

  - You are about to drop the column `IDT_ORGANIZATION` on the `ADDRESS` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[IDT_ADDRESS]` on the table `ORGANIZATION` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `IDT_ADDRESS` to the `ORGANIZATION` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ADDRESS" DROP CONSTRAINT "ADDRESS_IDT_ORGANIZATION_fkey";

-- DropIndex
DROP INDEX "ADDRESS_IDT_ORGANIZATION_key";

-- AlterTable
ALTER TABLE "ADDRESS" DROP COLUMN "IDT_ORGANIZATION";

-- AlterTable
ALTER TABLE "ORGANIZATION" ADD COLUMN     "IDT_ADDRESS" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ORGANIZATION_IDT_ADDRESS_key" ON "ORGANIZATION"("IDT_ADDRESS");

-- AddForeignKey
ALTER TABLE "ORGANIZATION" ADD CONSTRAINT "ORGANIZATION_IDT_ADDRESS_fkey" FOREIGN KEY ("IDT_ADDRESS") REFERENCES "ADDRESS"("IDT_ADDRESS") ON DELETE RESTRICT ON UPDATE CASCADE;
