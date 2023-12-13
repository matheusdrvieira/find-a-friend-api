import { PetEnergyLevelsEnum, PetEnvironmentEnum, PetIndependenceLevelsEnum, PetSizeEnum } from "../enum/pet.enum";
import { Pet } from "../interfaces/pet.interface";

export interface CreatePetUseCaseRequest {
    id?: string;
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

export interface CreatePetUseCaseResponse {
    pet: Pet;
}

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
