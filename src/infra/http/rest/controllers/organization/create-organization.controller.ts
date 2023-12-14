
import { createOrganizationValidate } from "@/application/factories-zod/organization/validate-zod";
import { makeCreateOrganizationUseCase } from "@/application/factories/organization/make-create-organization.use-case";
import { BodyOrganization } from "@/application/types/organization.type";
import { CreateOrganizationException } from "@/application/use-cases/organization/errors/organization-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateOrganizationController {
    public create = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const organizationValidate = await createOrganizationValidate(request.body as BodyOrganization, request.user.sub);

            const createOrganizationUseCase = makeCreateOrganizationUseCase();
            const { organization } = await createOrganizationUseCase.execute(organizationValidate);

            this.makeOrganizationIdCookie(organization.id!, response);

            return response.status(201).send({ message: "Organization Created Successfully!" });

        } catch (err) {
            if (err instanceof CreateOrganizationException) {
                return response.status(409).send(err.messageException());
            }

            throw err;
        }
    };

    private makeOrganizationIdCookie = async (organizationId: string, response: FastifyReply) => {

        return response.cookie("organization_id", organizationId, {
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });
    };
}
