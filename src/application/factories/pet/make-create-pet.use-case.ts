import { PrismaPetRepository } from "@/infra/database/prisma/repositories/prisma-pet-repository";
import { CreatePetUseCase } from "../../use-cases/pet/create-pet.use-case";

export function makeCreatePetUseCase() {
    const prismaPetRepository = new PrismaPetRepository();
    const createPetUseCase = new CreatePetUseCase(prismaPetRepository);

    return createPetUseCase;
}
