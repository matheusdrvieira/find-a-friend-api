import { makeCreatePetTypeUseCase } from "@/application/factories/make-create-pet-type.use-case";
import { CreatePetTypeException } from "@/application/use-cases/pet-type/errors/pet-type-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestType } from "fastify/types/type-provider";
import { PetTypeZodValidator } from "../validator/zod/petType/petType.validator";

export class PetTypeController {
    public create = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const petTypeValidate = await this.validatePetType(request.body);

            const createUseCase = makeCreatePetTypeUseCase();

            const { petType } = await createUseCase.execute(petTypeValidate);

            return response.status(201).send({ message: "PetType Created Successfully!", typeId: petType.id });

        } catch (err) {
            if (err instanceof CreatePetTypeException) {
                return response.status(409).send(err.messageException());
            }

            throw err;
        }
    };

    private validatePetType = async (body: FastifyRequestType["body"]) => {
        const validationSchema = new PetTypeZodValidator();

        return await validationSchema.petTypeBodyValidator(body);
    };
}
