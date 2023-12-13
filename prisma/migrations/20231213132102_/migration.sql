/*
  Warnings:

  - A unique constraint covering the columns `[NAM_NAME]` on the table `PET_TYPE` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PET_TYPE_NAM_NAME_key" ON "PET_TYPE"("NAM_NAME");
