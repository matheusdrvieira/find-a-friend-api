/*
  Warnings:

  - The values [HIGT] on the enum `PetEnergylevels` will be removed. If these variants are still used in the database, this will fail.
  - The values [HIGT] on the enum `PetIndependenceLevels` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "PetEnergylevels_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "PET" ALTER COLUMN "IND_ENERGY_LEVELS" TYPE "PetEnergylevels_new" USING ("IND_ENERGY_LEVELS"::text::"PetEnergylevels_new");
ALTER TYPE "PetEnergylevels" RENAME TO "PetEnergylevels_old";
ALTER TYPE "PetEnergylevels_new" RENAME TO "PetEnergylevels";
DROP TYPE "PetEnergylevels_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "PetIndependenceLevels_new" AS ENUM ('LOW', 'MEDIUM', 'HIGH');
ALTER TABLE "PET" ALTER COLUMN "IND_INDEPENDENCE_LEVELS" TYPE "PetIndependenceLevels_new" USING ("IND_INDEPENDENCE_LEVELS"::text::"PetIndependenceLevels_new");
ALTER TYPE "PetIndependenceLevels" RENAME TO "PetIndependenceLevels_old";
ALTER TYPE "PetIndependenceLevels_new" RENAME TO "PetIndependenceLevels";
DROP TYPE "PetIndependenceLevels_old";
COMMIT;
