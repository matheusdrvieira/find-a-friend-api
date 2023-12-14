import { findManyPetsValidate } from "@/application/factories-zod/pet/validate-zod";
import { makeFindManyPetUseCase } from "@/application/factories/pet/make-findMany-pet.use-case";
import { GenericPetException } from "@/application/use-cases/pet/errors/pet-generic-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class FindManyPetController {
    public index = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const petValidate = await findManyPetsValidate(request.query);

            const findManyPetUseCase = makeFindManyPetUseCase();

            const { pet } = await findManyPetUseCase.execute(petValidate);

            return response.status(200).send(pet);

        } catch (err) {
            if (err instanceof GenericPetException) {
                return response.status(409).send(err.messageException());
            }

            throw err;
        }
    };
}
