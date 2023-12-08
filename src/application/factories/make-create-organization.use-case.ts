import { PrismaOrganizationRepository } from "@/infra/database/prisma/repositories/prisma-organization-repository";
import { CreateOrganizationUseCase } from "../use-cases/organization/create-organization.use-case";

export function makeCreateOrganizationUseCase() {
    const prismaOrganizationRepository = new PrismaOrganizationRepository();
    const createOrganizationUseCase = new CreateOrganizationUseCase(prismaOrganizationRepository);

    return createOrganizationUseCase;
}
