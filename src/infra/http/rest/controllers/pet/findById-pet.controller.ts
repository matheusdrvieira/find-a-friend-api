import { findByIdPetValidate } from "@/application/factories-zod/pet/validate-zod";
import { makeFindByIdPetUseCase } from "@/application/factories/pet/make-findById-pet.use-case";
import { GenericPetException } from "@/application/use-cases/pet/errors/pet-generic-error";
import { FindPetException } from "@/application/use-cases/pet/errors/pet-not-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class FindByIdPetController {
    public show = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const petValidate = await findByIdPetValidate(request.params);

            const findByIdPetUseCase = makeFindByIdPetUseCase();

            const { pet } = await findByIdPetUseCase.execute(petValidate);

            return response.status(200).send({ pet });

        } catch (err) {
            if (err instanceof FindPetException) {
                return response.status(409).send(err.messageException());
            }

            if (err instanceof GenericPetException) {
                return response.status(409).send(err.messageException());
            }

            throw err;
        }
    };
}
