import { makeCreateOrganizationUseCase } from "@/application/factories/make-create-organization.use-case";
import { BodyOrganization } from "@/application/types/organization.type";
import { CreateOrganizationException } from "@/application/use-cases/organization/errors/organization-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { OrganizationZodValidator } from "../validator/zod/organization/organization.validator";

export class OrganizationController {
    public create = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const organizationValidate = await this.validateOrganization(request.body as BodyOrganization, request.user.sub);

            const createUseCase = makeCreateOrganizationUseCase();

            const { organization } = await createUseCase.execute(organizationValidate);
            this.makeOrganizationIdCookie(organization.id!, response);

            return response.status(201).send({ message: "Organization Created Successfully!" });

        } catch (err) {
            if (err instanceof CreateOrganizationException) {
                return response.status(409).send(err.messageException());
            }

            throw err;
        }
    };

    private validateOrganization = async (body: BodyOrganization, userId: string) => {
        const validationSchema = new OrganizationZodValidator();

        const organization = {
            userId,
            name: body.name,
            phone: body.phone,
            address: {
                uf: body.uf,
                country: body.country,
                city: body.city,
                province: body.province,
                neighbourhood: body.neighbourhood,
                postalCode: body.postalCode,
                lat: body.lat,
                lng: body.lng
            }
        };

        return await validationSchema.ornanizationBodyValidator(organization);
    };

    private makeOrganizationIdCookie = async (organizationId: string, response: FastifyReply) => {

        return response.cookie("organization_id", organizationId, {
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });
    };
}
