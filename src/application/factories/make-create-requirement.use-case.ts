import { PrismaRequirementRepository } from "@/infra/database/prisma/repositories/prisma-requirement-repository";
import { CreateRequirementUseCase } from "../use-cases/requirement/create-requirement.use-case";

export function makeCreateRequirementUseCase() {
    const prismaRequirementRepository = new PrismaRequirementRepository();
    const createRequirementUseCase = new CreateRequirementUseCase(prismaRequirementRepository);

    return createRequirementUseCase;
}
