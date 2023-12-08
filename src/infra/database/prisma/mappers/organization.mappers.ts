import { Organization } from "@/application/interfaces/organization.interface";
import { Organization as OrganizationPrisma, Prisma } from "@prisma/client";

export function convertToPrisma(data: Organization): Prisma.OrganizationUncheckedCreateInput {
    const organizationPrisma: Prisma.OrganizationUncheckedCreateInput = {
        userId: data.userId,
        addressId: data.addressId,
        name: data.name,
        phone: data.phone
    };

    return organizationPrisma;
}

export function convertToDomain(data: OrganizationPrisma): Organization {
    const organization: Organization = {
        id: data.id,
        userId: data.userId,
        addressId: data.addressId,
        name: data.name,
        phone: data.phone,
        createdAt: data.createdAt
    };

    return organization;
}
