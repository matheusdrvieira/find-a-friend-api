import { PrismaPetTypeRepository } from "@/infra/database/prisma/repositories/prisma-pet-type-repository";
import { CreatePetTypeUseCase } from "../use-cases/pet-type/create-pet-type.use-case";

export function makeCreatePetTypeUseCase() {
    const prismaPetTypeRepository = new PrismaPetTypeRepository();
    const createPetTypeUseCase = new CreatePetTypeUseCase(prismaPetTypeRepository);

    return createPetTypeUseCase;
}
