import { PetEnergyLevelsEnum, PetEnvironmentEnum, PetIndependenceLevelsEnum, PetSizeEnum } from "@/application/enum/pet.enum";
import { Pet } from "@/application/interfaces/pet.interface";
import { Pet as PetPrisma, Prisma } from "@prisma/client";

export function convertToPrisma(data: Pet): Prisma.PetUncheckedCreateInput {
    const petPrisma: Prisma.PetUncheckedCreateInput = {
        typeId: data.typeId,
        organizationId: data.organizationId,
        name: data.name,
        age: data.age,
        description: data.description,
        toAdopt: data.toAdopt,
        energyLevels: PetEnergyLevelsEnum[data.energyLevels] as PetEnergyLevelsEnum,
        environment: PetEnvironmentEnum[data.environment] as PetEnvironmentEnum,
        size: PetSizeEnum[data.size] as PetSizeEnum,
        independenceLevels: PetIndependenceLevelsEnum[data.independenceLevels] as PetIndependenceLevelsEnum
    };

    return petPrisma;
}

export function convertToDomain(data: PetPrisma): Pet {
    const pet: Pet = {
        id: data.id,
        organizationId: data.organizationId,
        typeId: data.typeId,
        name: data.name,
        description: data.description,
        age: data.age,
        toAdopt: data.toAdopt,
        energyLevels: PetEnergyLevelsEnum[data.energyLevels],
        environment: PetEnvironmentEnum[data.environment],
        independenceLevels: PetIndependenceLevelsEnum[data.independenceLevels],
        size: PetSizeEnum[data.size],
        createdAt: data.createdAt
    };

    return pet;
}
