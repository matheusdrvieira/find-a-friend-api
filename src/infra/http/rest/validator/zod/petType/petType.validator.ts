import { FastifyRequestType } from "fastify/types/type-provider";
import { createPetTypeBodySchema } from "../schema/petType.schema";
import { PetTypeValidator } from "./petType.validator.abstract";

export class PetTypeZodValidator implements PetTypeValidator {
    async petTypeBodyValidator(body: FastifyRequestType["body"]) {

        return createPetTypeBodySchema.parse(body);
    }
}
