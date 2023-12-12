import { FastifyRequestType } from "fastify/types/type-provider";
import { createSessionBodySchema } from "../schema/session.schema";
import { SessionValidator } from "./session.validator.abstract";

export class SessionZodValidator implements SessionValidator {
    async sessionBodyValidator(body: FastifyRequestType["body"]) {

        return createSessionBodySchema.parse(body);
    }
}
