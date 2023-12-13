import { Requirement } from "@/application/interfaces/requirement.inteface";
import { Prisma, Requirement as RequirementPrisma } from "@prisma/client";

export function convertToPrisma(data: Requirement): Prisma.RequirementUncheckedCreateInput {
    const requiremenPrisma: Prisma.RequirementUncheckedCreateInput = {
        petId: data.petId,
        description: data.description
    };

    return requiremenPrisma;
}

export function convertToDomain(data: RequirementPrisma): Requirement {
    const requirement: Requirement = {
        id: data.id,
        petId: data.petId,
        description: data.description,
        createdAt: data.createdAt
    };

    return requirement;
}
