import { PrismaPetRepository } from "@/infra/database/prisma/repositories/prisma-pet-repository";
import { FindPetByIdUseCase } from "../../use-cases/pet/findById-pet.use-case";

export function makeFindPetByIdUseCase() {
    const prismaPetRepository = new PrismaPetRepository();
    const findPetByIdUseCase = new FindPetByIdUseCase(prismaPetRepository);

    return findPetByIdUseCase;
}
