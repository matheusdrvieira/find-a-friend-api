import { PrismaPetRepository } from "@/infra/database/prisma/repositories/prisma-pet-repository";
import { FindManyPetUseCase } from "../../use-cases/pet/findMany-pet.use-case";

export function makeFindManyPetUseCase() {
    const prismaPetRepository = new PrismaPetRepository();
    const findManyPetUseCase = new FindManyPetUseCase(prismaPetRepository);

    return findManyPetUseCase;
}
