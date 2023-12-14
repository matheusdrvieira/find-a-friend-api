
import { createPetTypeValidate } from "@/application/factories-zod/pet-type/validate-zod";
import { makeCreatePetTypeUseCase } from "@/application/factories/pet-type/make-create-pet-type.use-case";
import { CreatePetTypeException } from "@/application/use-cases/pet-type/errors/pet-type-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreatePetTypeController {
    public create = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const petTypeValidate = await createPetTypeValidate(request.body);

            const createPetTypeUseCase = makeCreatePetTypeUseCase();

            const { petType } = await createPetTypeUseCase.execute(petTypeValidate);

            return response.status(201).send({ message: "PetType Created Successfully!", typeId: petType.id });

        } catch (err) {
            if (err instanceof CreatePetTypeException) {
                return response.status(409).send(err.messageException());
            }

            throw err;
        }
    };

}
