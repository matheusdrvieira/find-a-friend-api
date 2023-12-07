-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('ADOPTER', 'ORGANIZATION');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('BASIC', 'ADMIN');

-- CreateEnum
CREATE TYPE "PetSize" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateEnum
CREATE TYPE "PetEnergylevels" AS ENUM ('LOW', 'MEDIUM', 'HIGT');

-- CreateEnum
CREATE TYPE "PetIndependenceLevels" AS ENUM ('LOW', 'MEDIUM', 'HIGT');

-- CreateEnum
CREATE TYPE "PetEnvironment" AS ENUM ('SMALL', 'MEDIUM', 'LARGE');

-- CreateTable
CREATE TABLE "USER" (
    "IDT_USER" TEXT NOT NULL,
    "NAM_NAME" TEXT NOT NULL,
    "NAM_EMAIL" TEXT NOT NULL,
    "NAM_PASSWORD" TEXT NOT NULL,
    "IND_TYPE" "UserType" NOT NULL DEFAULT 'ADOPTER',
    "IND_ROLE" "UserRole" NOT NULL DEFAULT 'BASIC',
    "DAT_CREATED" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "USER_pkey" PRIMARY KEY ("IDT_USER")
);

-- CreateTable
CREATE TABLE "ORGANIZATION" (
    "IDT_ORGANIZATION" TEXT NOT NULL,
    "IDT_USER" TEXT NOT NULL,
    "NAM_NAME" TEXT NOT NULL,
    "DES_PHONE" INTEGER NOT NULL,
    "DAT_CREATED" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ORGANIZATION_pkey" PRIMARY KEY ("IDT_ORGANIZATION")
);

-- CreateTable
CREATE TABLE "ADDRESS" (
    "IDT_ADDRESS" TEXT NOT NULL,
    "IDT_ORGANIZATION" TEXT NOT NULL,
    "DES_POSTAL_CODE" TEXT NOT NULL,
    "DES_UF" TEXT NOT NULL,
    "DES_COUNTRY" TEXT NOT NULL,
    "DES_CITY" TEXT NOT NULL,
    "DES_PROVINCE" TEXT NOT NULL,
    "DES_NEIGBOURHOOD" TEXT NOT NULL,
    "DES_LAT" TEXT NOT NULL,
    "DES_LNG" TEXT NOT NULL,
    "DAT_CREATED" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ADDRESS_pkey" PRIMARY KEY ("IDT_ADDRESS")
);

-- CreateTable
CREATE TABLE "PET_TYPE" (
    "IDT_PET_TYPE" TEXT NOT NULL,
    "NAM_NAME" TEXT NOT NULL,
    "DAT_CREATED" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PET_TYPE_pkey" PRIMARY KEY ("IDT_PET_TYPE")
);

-- CreateTable
CREATE TABLE "PET" (
    "IDT_PET" TEXT NOT NULL,
    "IDT_ORGANIZATION" TEXT NOT NULL,
    "IDT_PET_TYPE" TEXT NOT NULL,
    "NAM_NAME" TEXT NOT NULL,
    "DES_DESCRIPTION" TEXT NOT NULL,
    "NUM_AGE" INTEGER NOT NULL,
    "IND_SIZE" "PetSize" NOT NULL,
    "IND_ENVIRONMENT" "PetEnvironment" NOT NULL,
    "IND_ENERGY_LEVELS" "PetEnergylevels" NOT NULL,
    "IND_INDEPENDENCE_LEVELS" "PetIndependenceLevels" NOT NULL,
    "FLG_TO_ADOPT" BOOLEAN NOT NULL,
    "DAT_CREATED" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PET_pkey" PRIMARY KEY ("IDT_PET")
);

-- CreateTable
CREATE TABLE "REQUIREMENT" (
    "IDT_REQUIREMENT" TEXT NOT NULL,
    "IDT_PET" TEXT NOT NULL,
    "DES_DESCRIPTION" TEXT NOT NULL,
    "DAT_CREATED" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "REQUIREMENT_pkey" PRIMARY KEY ("IDT_REQUIREMENT")
);

-- CreateTable
CREATE TABLE "PICTURE" (
    "IDT_PICTURE" TEXT NOT NULL,
    "IDT_PET" TEXT NOT NULL,
    "DES_PICTURE" TEXT NOT NULL,
    "DAT_CREATED" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PICTURE_pkey" PRIMARY KEY ("IDT_PICTURE")
);

-- CreateTable
CREATE TABLE "ADOPTION" (
    "IDT_ADOPTION" TEXT NOT NULL,
    "IDT_USER" TEXT NOT NULL,
    "IDT_PET" TEXT NOT NULL,
    "DAT_CREATED" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ADOPTION_pkey" PRIMARY KEY ("IDT_ADOPTION")
);

-- CreateIndex
CREATE UNIQUE INDEX "USER_NAM_EMAIL_key" ON "USER"("NAM_EMAIL");

-- CreateIndex
CREATE UNIQUE INDEX "ORGANIZATION_IDT_USER_key" ON "ORGANIZATION"("IDT_USER");

-- CreateIndex
CREATE UNIQUE INDEX "ADDRESS_IDT_ORGANIZATION_key" ON "ADDRESS"("IDT_ORGANIZATION");

-- CreateIndex
CREATE UNIQUE INDEX "PET_IDT_PET_TYPE_key" ON "PET"("IDT_PET_TYPE");

-- CreateIndex
CREATE UNIQUE INDEX "ADOPTION_IDT_PET_key" ON "ADOPTION"("IDT_PET");

-- AddForeignKey
ALTER TABLE "ORGANIZATION" ADD CONSTRAINT "ORGANIZATION_IDT_USER_fkey" FOREIGN KEY ("IDT_USER") REFERENCES "USER"("IDT_USER") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ADDRESS" ADD CONSTRAINT "ADDRESS_IDT_ORGANIZATION_fkey" FOREIGN KEY ("IDT_ORGANIZATION") REFERENCES "ORGANIZATION"("IDT_ORGANIZATION") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PET" ADD CONSTRAINT "PET_IDT_ORGANIZATION_fkey" FOREIGN KEY ("IDT_ORGANIZATION") REFERENCES "ORGANIZATION"("IDT_ORGANIZATION") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PET" ADD CONSTRAINT "PET_IDT_PET_TYPE_fkey" FOREIGN KEY ("IDT_PET_TYPE") REFERENCES "PET_TYPE"("IDT_PET_TYPE") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "REQUIREMENT" ADD CONSTRAINT "REQUIREMENT_IDT_PET_fkey" FOREIGN KEY ("IDT_PET") REFERENCES "PET"("IDT_PET") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PICTURE" ADD CONSTRAINT "PICTURE_IDT_PET_fkey" FOREIGN KEY ("IDT_PET") REFERENCES "PET"("IDT_PET") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ADOPTION" ADD CONSTRAINT "ADOPTION_IDT_USER_fkey" FOREIGN KEY ("IDT_USER") REFERENCES "USER"("IDT_USER") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ADOPTION" ADD CONSTRAINT "ADOPTION_IDT_PET_fkey" FOREIGN KEY ("IDT_PET") REFERENCES "PET"("IDT_PET") ON DELETE RESTRICT ON UPDATE CASCADE;