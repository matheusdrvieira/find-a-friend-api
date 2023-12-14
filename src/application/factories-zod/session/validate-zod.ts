import { SessionZodValidator } from "@/infra/http/rest/validator/zod/session/session.validator";
import { FastifyRequestType } from "fastify/types/type-provider";

export async function createSessionValidate(body: FastifyRequestType["body"]) {
    const validationSchema = new SessionZodValidator();

    return await validationSchema.sessionBodyValidator(body);
}
