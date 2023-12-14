import { PetTypeZodValidator } from "@/infra/http/rest/validator/zod/petType/petType.validator";
import { FastifyRequestType } from "fastify/types/type-provider";

export async function createPetTypeValidate(body: FastifyRequestType["body"]) {
    const validationSchema = new PetTypeZodValidator();

    return await validationSchema.petTypeBodyValidator(body);
}
