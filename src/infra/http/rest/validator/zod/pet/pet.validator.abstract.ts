import { FastifyRequestType } from "fastify/types/type-provider";

export interface PetValidator {
    petBodyValidator(body: FastifyRequestType["body"]): Promise<FastifyRequestType["body"] | null>;
}
