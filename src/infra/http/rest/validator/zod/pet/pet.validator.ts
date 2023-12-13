import { FastifyRequestType } from "fastify/types/type-provider";
import { createPetBodySchema } from "../schema/pet.schema";
import { PetValidator } from "./pet.validator.abstract";

export class PetZodValidator implements PetValidator {
    async petBodyValidator(body: FastifyRequestType["body"]) {

        return createPetBodySchema.parse(body);
    }
}
