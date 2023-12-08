import { makeCreateAddressUseCase } from "@/application/factories/make-create-address.use-case";
import { Address } from "@/application/interfaces/address.interface";
import { Organization } from "@/application/interfaces/organization.interface";
import { CreateOrganizationUseCaseRequest, CreateOrganizationUseCaseResponse } from "@/application/types/organization.types";
import { OrganizationRepository } from "@/infra/database/repositories/organization-repository";
import { CreateOrganizationException } from "./errors/organization-already-exists-error";

export class CreateOrganizationUseCase {
    constructor(private organizationRepository: OrganizationRepository) { }

    public execute = async (body: CreateOrganizationUseCaseRequest): Promise<CreateOrganizationUseCaseResponse> => {
        try {
            const { name, phone, userId } = body;

            const createAddress = makeCreateAddressUseCase();
            const { address } = await createAddress.execute(body.address);

            if (!address.id) throw new Error("Address is not defined");

            const responseOrganization = await this.organizationRepository.create({
                userId,
                addressId: address.id,
                name,
                phone
            });

            const organization = this.formatResponseOrganization(responseOrganization, address);

            return { organization };

        } catch (err) {

            throw new CreateOrganizationException((err as Error).message);
        }
    };

    private formatResponseOrganization = (responseOrganization: Organization, address: Address) => {
        return {
            ...responseOrganization,
            address: { ...address }
        };
    };
}
