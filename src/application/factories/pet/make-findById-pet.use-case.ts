import { PrismaPetRepository } from "@/infra/database/prisma/repositories/prisma-pet-repository";
import { FindByIdPetUseCase } from "../../use-cases/pet/findById-pet.use-case";

export function makeFindByIdPetUseCase() {
    const prismaPetRepository = new PrismaPetRepository();
    const findByIdPetUseCase = new FindByIdPetUseCase(prismaPetRepository);

    return findByIdPetUseCase;
}
