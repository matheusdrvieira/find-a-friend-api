import { makeCreateOrganizationUseCase } from "@/application/factories/make-create-organization.use-case";
import { BodyOrganization } from "@/application/types/organization.types";
import { CreateOrganizationException } from "@/application/use-cases/organization/errors/organization-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { OrganizationZodValidator } from "../validator/zod/organization/organization.validator";

export class OrganizationController {
    public create = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const organizationValidate = await this.validateOrganization(request.body as BodyOrganization, request.cookies["user_id"]!);

            const createUseCase = makeCreateOrganizationUseCase();

            const { organization } = await createUseCase.execute(organizationValidate);

            return response.status(201).send({ message: "Organization Created Successfully!", organization });

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
}