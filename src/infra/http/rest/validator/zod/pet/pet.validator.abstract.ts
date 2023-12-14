import { FastifyRequestType } from "fastify/types/type-provider";

export interface PetValidator {
    petBodyValidator(body: FastifyRequestType["body"]): Promise<FastifyRequestType["body"] | null>;
    petQueryValidator(query: FastifyRequestType["query"]): Promise<FastifyRequestType["query"] | null>;
    petParamsValidator(params: FastifyRequestType["params"]): Promise<FastifyRequestType["params"] | null>;
}
