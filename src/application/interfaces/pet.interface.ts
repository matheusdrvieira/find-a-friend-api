import { PetEnergyLevelsEnum, PetEnvironmentEnum, PetIndependenceLevelsEnum, PetSizeEnum } from "../enum/pet.enum";

// Method Create 

export interface Pet {
    id?: string;
    organizationId: string;
    typeId: string;
    name: string;
    description: string;
    age: number;
    size: PetSizeEnum;
    environment: PetEnvironmentEnum;
    energyLevels: PetEnergyLevelsEnum;
    independenceLevels: PetIndependenceLevelsEnum;
    toAdopt: boolean;
    createdAt?: Date;
}

// Method FindMany 

export interface FindManyPet {
    age?: number;
    size?: PetSizeEnum;
    energyLevels?: PetEnergyLevelsEnum;
    independenceLevels?: PetIndependenceLevelsEnum;
    city: string;
    uf: string;
    take: number;
    skip: number;
}

export interface Pagination {
    skip: number;
    total: number;
    take: number;
}

export interface PetsToAdopt {
    pets: Pet[]
    pagination: Pagination
}

// Method FindById 

export interface FindByIdPet {
    id: string;
}
