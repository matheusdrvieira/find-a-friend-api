import { FindPetByIdUseCaseRequest, FindPetByIdUseCaseResponse } from "@/application/types/pet.type";
import { PetRepository } from "@/infra/database/repositories/pet-repository";
import { GenericPetException } from "./errors/pet-generic-error";

export class FindPetByIdUseCase {
    constructor(private PetRepository: PetRepository) { }

    public execute = async (query: FindPetByIdUseCaseRequest): Promise<FindPetByIdUseCaseResponse> => {
        try {
            const pet = await this.PetRepository.findById(query);

            if (!pet) throw new GenericPetException("Pet not exists");

            return { pet };

        } catch (err) {

            throw new GenericPetException((err as Error).message);
        }
    };
}
