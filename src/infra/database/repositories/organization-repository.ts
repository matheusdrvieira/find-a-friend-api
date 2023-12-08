import { Organization } from "@/application/interfaces/organization.interface";

export interface OrganizationRepository {
    create(data: Organization): Promise<Organization>;
}
