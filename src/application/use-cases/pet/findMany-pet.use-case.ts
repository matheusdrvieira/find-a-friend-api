import { FindManyPetUseCaseRequest, FindManyPetUseCaseResponse } from "@/application/types/pet.type";
import { PetRepository } from "@/infra/database/repositories/pet-repository";
import { ListPetException } from "./errors/pet-not-exists-error";

export class FindManyPetUseCase {
    constructor(private PetRepository: PetRepository) { }

    public execute = async (query: FindManyPetUseCaseRequest): Promise<FindManyPetUseCaseResponse> => {
        try {
            const pet = await this.PetRepository.findMany(query);

            return { pet };

        } catch (err) {

            throw new ListPetException((err as Error).message);
        }
    };
}
