import { Organization } from "@/application/interfaces/organization.interface";
import { prisma } from "@/infra/database/lib/prisma";
import { OrganizationRepository } from "../../repositories/organization-repository";
import { convertToDomain, convertToPrisma } from "../mappers/organization.mappers";

export class PrismaOrganizationRepository implements OrganizationRepository {
    async create(data: Organization): Promise<Organization> {
        const organization = await prisma.organization.create({
            data: convertToPrisma(data),
        });

        return convertToDomain(organization);
    }
}
