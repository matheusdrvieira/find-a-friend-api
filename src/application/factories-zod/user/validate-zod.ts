import { UserZodValidator } from "@/infra/http/rest/validator/zod/user/user.validator";
import { FastifyRequestType } from "fastify/types/type-provider";

export async function createUserValidate(body: FastifyRequestType["body"]) {
    const validationSchema = new UserZodValidator();

    return await validationSchema.userBodyValidator(body);
}
