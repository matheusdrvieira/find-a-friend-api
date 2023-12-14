import { PetEnergyLevelsEnum, PetEnvironmentEnum, PetIndependenceLevelsEnum, PetSizeEnum } from "../enum/pet.enum";
import { Pet } from "../interfaces/pet.interface";

// Method Create

export interface CreatePetUseCaseRequest {
    organizationId: string;
    typeId: string;
    name: string;
    pictures: string[];
    requirements: string[];
    description: string;
    age: number;
    size: PetSizeEnum;
    environment: PetEnvironmentEnum;
    energyLevels: PetEnergyLevelsEnum;
    independenceLevels: PetIndependenceLevelsEnum;
    toAdopt: boolean;
    createdAt?: Date;
}

export type CreatePetUseCaseResponse = {
    pet: Pet;
}

// Method FindMany

export type FindManyPetUseCaseRequest = {
    age?: number;
    size?: PetSizeEnum;
    energyLevels?: PetEnergyLevelsEnum;
    independenceLevels?: PetIndependenceLevelsEnum;
    city: string;
    uf: string;
    take: number;
    skip: number;
}

export type FindManyPetUseCaseResponse = {
    age?: number;
    size?: PetSizeEnum;
    energyLevels?: PetEnergyLevelsEnum;
    independenceLevels?: PetIndependenceLevelsEnum;
    city: string;
    uf: string;
    take: number;
    skip: number;
}

// Method FindById

export type FindByIdPetUseCaseRequest = {
    id: string;
}

export type FindByIdPetUseCaseResponse = {
    pet: Pet
}

// Convert body

export type BodyPet = {
    typeId: string;
    name: string;
    pictures: string[];
    requirements: string[];
    description: string;
    age: number;
    size: PetSizeEnum;
    environment: PetEnvironmentEnum;
    energyLevels: PetEnergyLevelsEnum;
    independenceLevels: PetIndependenceLevelsEnum;
    toAdopt: boolean;
}
