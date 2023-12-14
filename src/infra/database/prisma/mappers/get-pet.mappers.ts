import { PetEnergyLevelsEnum, PetEnvironmentEnum, PetIndependenceLevelsEnum, PetSizeEnum } from "@/application/enum/pet.enum";
import { Pagination, PetsToAdopt } from "@/application/interfaces/pet.interface";
import { Pet as PetPrisma } from "@prisma/client";

export function convertGetToDomain(data: PetPrisma[], pagination: Pagination): PetsToAdopt {
    const pets = data.map((pet) => {
        return {
            id: pet.id,
            organizationId: pet.organizationId,
            typeId: pet.typeId,
            name: pet.name,
            description: pet.description,
            age: pet.age,
            toAdopt: pet.toAdopt,
            energyLevels: PetEnergyLevelsEnum[pet.energyLevels],
            environment: PetEnvironmentEnum[pet.environment],
            independenceLevels: PetIndependenceLevelsEnum[pet.independenceLevels],
            size: PetSizeEnum[pet.size],
            createdAt: pet.createdAt
        };
    });

    const page: Pagination = {
        skip: pagination.skip,
        total: pagination.total,
        take: pagination.take
    };

    const petsToAdopt: PetsToAdopt = {
        pets,
        pagination: page
    };

    return petsToAdopt;
}
