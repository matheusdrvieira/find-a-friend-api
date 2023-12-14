import { FindByIdPetUseCaseRequest, FindByIdPetUseCaseResponse } from "@/application/types/pet.type";
import { PetRepository } from "@/infra/database/repositories/pet-repository";
import { GenericPetException } from "./errors/pet-generic-error";
import { FindPetException } from "./errors/pet-not-exists-error";

export class FindByIdPetUseCase {
    constructor(private PetRepository: PetRepository) { }

    public execute = async (query: FindByIdPetUseCaseRequest): Promise<FindByIdPetUseCaseResponse> => {
        try {
            const pet = await this.PetRepository.findById(query);

            if (!pet) throw new FindPetException("Pet not exists");

            return { pet };

        } catch (err) {
            if (err instanceof FindPetException) {
                throw new FindPetException((err as Error).message);
            }

            throw new GenericPetException((err as Error).message);
        }
    };
}
