import { FastifyRequestType } from "fastify/types/type-provider";
import { createPetBodySchema, fetchPetParamsSchema, getPetQuerySchema } from "../schema/pet.schema";
import { PetValidator } from "./pet.validator.abstract";

export class PetZodValidator implements PetValidator {
    async petBodyValidator(body: FastifyRequestType["body"]) {

        return createPetBodySchema.parse(body);
    }

    async petQueryValidator(query: FastifyRequestType["query"]) {

        return getPetQuerySchema.parse(query);
    }

    async petParamsValidator(params: FastifyRequestType["params"]) {

        return fetchPetParamsSchema.parse(params);
    }
}
