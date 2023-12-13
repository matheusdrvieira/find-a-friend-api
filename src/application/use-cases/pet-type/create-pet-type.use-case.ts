import { CreatePetTypeUseCaseRequest, CreatePetTypeUseCaseResponse } from "@/application/types/pet-type.type";
import { PetTypeRepository } from "@/infra/database/repositories/pet-type-repository";
import { CreatePetTypeException } from "./errors/pet-type-already-exists-error";

export class CreatePetTypeUseCase {
    constructor(private PetTypeRepository: PetTypeRepository) { }

    public execute = async (body: CreatePetTypeUseCaseRequest): Promise<CreatePetTypeUseCaseResponse> => {
        try {
            const { name } = body;

            const petType = await this.PetTypeRepository.create({ name });

            return { petType };

        } catch (err) {

            throw new CreatePetTypeException((err as Error).message);
        }
    };
}
