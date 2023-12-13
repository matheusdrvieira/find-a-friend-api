import { FastifyRequestType } from "fastify/types/type-provider";

export interface PetTypeValidator {
    petTypeBodyValidator(body: FastifyRequestType["body"]): Promise<FastifyRequestType["body"] | null>;
}
