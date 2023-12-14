import { BodyOrganization } from "@/application/types/organization.type";
import { OrganizationZodValidator } from "@/infra/http/rest/validator/zod/organization/organization.validator";

export async function createOrganizationValidate(body: BodyOrganization, userId: string) {
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
}
