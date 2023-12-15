import { findByIdPetValidate } from "@/application/factories-zod/pet/validate-zod";
import { makeFindPetByIdUseCase } from "@/application/factories/pet/make-findById-pet.use-case";
import { GenericPetException } from "@/application/use-cases/pet/errors/pet-generic-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class FindByIdPetController {
    public show = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const petValidate = await findByIdPetValidate(request.params);

            const findPetByIdUseCase = makeFindPetByIdUseCase();

            const { pet } = await findPetByIdUseCase.execute(petValidate);

            return response.status(200).send({ pet });

        } catch (err) {
            if (err instanceof GenericPetException) {
                return response.status(409).send(err.messageException());
            }

            throw err;
        }
    };
}
