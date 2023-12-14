import { PetEnergyLevelsEnum, PetEnvironmentEnum, PetIndependenceLevelsEnum, PetSizeEnum } from "@/application/enum/pet.enum";
import { z } from "zod";

const petSizeEnum = Object.values(PetSizeEnum) as [PetSizeEnum];
const petEnergyLevelsEnum = Object.values(PetEnergyLevelsEnum) as [PetEnergyLevelsEnum];
const petEnvironmentEnum = Object.values(PetEnvironmentEnum) as [PetEnvironmentEnum];
const petIndependenceLevelsEnum = Object.values(PetIndependenceLevelsEnum) as [PetIndependenceLevelsEnum];

export const createPetBodySchema = z.object({
    organizationId: z.string().uuid(),
    typeId: z.string().uuid(),
    name: z.string(),
    age: z.number(),
    description: z.string(),
    toAdopt: z.boolean(),
    pictures: z.array(z.string()),
    requirements: z.array(z.string()),
    size: z.enum(petSizeEnum),
    energyLevels: z.enum(petEnergyLevelsEnum),
    environment: z.enum(petEnvironmentEnum),
    independenceLevels: z.enum(petIndependenceLevelsEnum),
});

export const getPetQuerySchema = z.object({
    city: z.string(),
    uf: z.string(),
    size: z.enum(petSizeEnum).optional(),
    energyLevels: z.enum(petEnergyLevelsEnum).optional(),
    independenceLevels: z.enum(petIndependenceLevelsEnum).optional(),
    age: z.string().transform((value) => Number(value)).optional(),
    skip: z.string().default("1").transform((value) => Number(value)),
    take: z.string().default("100").transform((value) => Number(value))
});

export const fetchPetParamsSchema = z.object({
    id: z.string().uuid(),
});
