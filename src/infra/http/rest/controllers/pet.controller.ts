import { makeCreatePetUseCase } from "@/application/factories/make-create-pet.use-case";
import { BodyPet } from "@/application/types/pet.type";
import { CreatePetException } from "@/application/use-cases/pet/errors/pet-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { PetZodValidator } from "../validator/zod/pet/pet.validator";

export class PetController {
    public create = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const petValidate = await this.validatePet(request.body as BodyPet, request.cookies["organization_id"]!);

            const createUseCase = makeCreatePetUseCase();

            const { pet } = await createUseCase.execute(petValidate);

            return response.status(201).send({ message: "Organization Created Successfully!", petId: pet.id });

        } catch (err) {
            if (err instanceof CreatePetException) {
                return response.status(409).send(err.messageException());
            }

            throw err;
        }
    };

    private validatePet = async (body: BodyPet, organizationId: string) => {
        const validationSchema = new PetZodValidator();

        const pet = {
            organizationId,
            typeId: body.typeId,
            name: body.name,
            toAdopt: body.toAdopt,
            age: body.age,
            description: body.description,
            size: body.size,
            environment: body.environment,
            energyLevels: body.energyLevels,
            independenceLevels: body.independenceLevels,
            pictures: body.pictures,
            requirements: body.requirements
        };

        return await validationSchema.petBodyValidator(pet);
    };
}
