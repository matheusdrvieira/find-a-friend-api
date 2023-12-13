import { makeCreatePictureUseCase } from "@/application/factories/make-create-picture.use-case";
import { makeCreateRequirementUseCase } from "@/application/factories/make-create-requirement.use-case";
import { CreatePetUseCaseRequest, CreatePetUseCaseResponse } from "@/application/types/pet.type";
import { PetRepository } from "@/infra/database/repositories/pet-repository";
import { CreatePetException } from "./errors/pet-already-exists-error";

export class CreatePetUseCase {
    constructor(private PetRepository: PetRepository) { }

    public execute = async (body: CreatePetUseCaseRequest): Promise<CreatePetUseCaseResponse> => {
        try {
            const { organizationId, typeId, name, description, age, size, environment, energyLevels, independenceLevels, toAdopt } = body;

            const pet = await this.PetRepository.create({
                organizationId,
                typeId,
                name,
                description,
                age,
                size,
                environment,
                energyLevels,
                independenceLevels,
                toAdopt
            });

            const pictures = this.formatResponsePicture(pet.id!, body.pictures);
            const petPicture = makeCreatePictureUseCase();

            await petPicture.execute(pictures);

            const requirements = this.formatResponseRequirement(pet.id!, body.requirements);
            const petRequirement = makeCreateRequirementUseCase();

            await petRequirement.execute(requirements);

            return { pet };

        } catch (err) {

            throw new CreatePetException((err as Error).message);
        }
    };

    private formatResponsePicture = (petId: string, pictures: string[]) => {
        return {
            petId,
            pictures
        };
    };

    private formatResponseRequirement = (petId: string, requirements: string[]) => {
        return {
            petId,
            requirements
        };
    };
}
