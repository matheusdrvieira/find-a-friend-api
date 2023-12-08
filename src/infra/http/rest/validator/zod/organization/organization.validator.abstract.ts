import { FastifyRequestType } from "fastify/types/type-provider";

export interface OrganizationValidator {
    ornanizationBodyValidator(body: FastifyRequestType["body"]): Promise<FastifyRequestType["body"] | null>;
}
