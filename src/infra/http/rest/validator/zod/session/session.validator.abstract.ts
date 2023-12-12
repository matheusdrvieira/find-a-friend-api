import { FastifyRequestType } from "fastify/types/type-provider";

export interface SessionValidator {
    sessionBodyValidator(body: FastifyRequestType["body"]): Promise<FastifyRequestType["body"] | null>;
}
