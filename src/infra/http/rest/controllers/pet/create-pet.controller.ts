import { createPetValidate } from "@/application/factories-zod/pet/validate-zod";
import { makeCreatePetUseCase } from "@/application/factories/pet/make-create-pet.use-case";
import { BodyPet } from "@/application/types/pet.type";
import { CreatePetException } from "@/application/use-cases/pet/errors/pet-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreatePetController {
    public create = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const petValidate = await createPetValidate(request.body as BodyPet, request.cookies["organization_id"]!);

            const createPetUseCase = makeCreatePetUseCase();

            const { pet } = await createPetUseCase.execute(petValidate);

            return response.status(201).send({ message: "Pet Created Successfully!", petId: pet.id });

        } catch (err) {
            if (err instanceof CreatePetException) {
                return response.status(409).send(err.messageException());
            }

            throw err;
        }
    };
}
