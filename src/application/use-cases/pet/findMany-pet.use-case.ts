import { FindManyPetUseCaseRequest } from "@/application/types/pet.type";
import { PetRepository } from "@/infra/database/repositories/pet-repository";
import { GenericPetException } from "./errors/pet-generic-error";

export class FindManyPetUseCase {
    constructor(private PetRepository: PetRepository) { }

    public execute = async (query: FindManyPetUseCaseRequest) => {
        try {
            const pet = await this.PetRepository.findMany(query);

            return { pet };

        } catch (err) {

            throw new GenericPetException((err as Error).message);
        }
    };
}
