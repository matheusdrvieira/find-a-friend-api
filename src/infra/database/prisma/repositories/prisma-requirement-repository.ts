import { Requirement } from "@/application/interfaces/requirement.inteface";
import { prisma } from "@/infra/database/lib/prisma";
import { RequirementRepository } from "../../repositories/requirement-repository";
import { convertToDomain, convertToPrisma } from "../mappers/requirement.mappers";

export class PrismaRequirementRepository implements RequirementRepository {
    async create(data: Requirement): Promise<Requirement> {
        const requirement = await prisma.requirement.create({
            data: convertToPrisma(data),
        });

        return convertToDomain(requirement);
    }
}
