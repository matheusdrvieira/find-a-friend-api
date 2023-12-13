import { PetType } from "@/application/interfaces/pet-type.interface";
import { PetType as PetTypePrisma, Prisma } from "@prisma/client";

export function convertToPrisma(data: PetType): Prisma.PetTypeUncheckedCreateInput {
    const petTypePrisma: Prisma.PetTypeUncheckedCreateInput = {
        name: data.name
    };

    return petTypePrisma;
}

export function convertToDomain(data: PetTypePrisma): PetType {
    const petType: PetType = {
        id: data.id,
        name: data.name,
        createdAt: data.createdAt
    };

    return petType;
}
