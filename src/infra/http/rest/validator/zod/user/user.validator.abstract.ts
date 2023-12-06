import { FastifyRequestType } from "fastify/types/type-provider";

export interface UserValidator {
    userBodyValidator(body: FastifyRequestType["body"]): Promise<FastifyRequestType["body"] | null>;
}
