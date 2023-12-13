import { PetEnergyLevelsEnum, PetEnvironmentEnum, PetIndependenceLevelsEnum, PetSizeEnum } from "../enum/pet.enum";

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
