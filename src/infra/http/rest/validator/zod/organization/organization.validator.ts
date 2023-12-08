import { FastifyRequestType } from "fastify/types/type-provider";
import { createOrganizationBodySchema } from "../schema/organization.schema";
import { OrganizationValidator } from "./organization.validator.abstract";

export class OrganizationZodValidator implements OrganizationValidator {
    async ornanizationBodyValidator(body: FastifyRequestType["body"]) {

        return createOrganizationBodySchema.parse(body);
    }
}
