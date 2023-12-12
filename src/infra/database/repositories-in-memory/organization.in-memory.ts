import { Organization } from "@/application/interfaces/organization.interface";
import { randomUUID } from "crypto";
import { OrganizationRepository } from "../repositories/organization-repository";

export class OrganizationInMemory implements OrganizationRepository {
    public ORGANIZATIONS: Organization[] = [];

    async create(data: Organization): Promise<Organization> {
        const organization = {
            id: randomUUID(),
            userId: data.userId,
            addressId: data.addressId,
            name: data.name,
            phone: data.phone,
            createdAt: new Date(),
        };

        this.ORGANIZATIONS.push(organization);

        return organization;
    }
}
