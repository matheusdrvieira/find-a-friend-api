import { Address } from "../interfaces/address.interface";
import { Organization } from "../interfaces/organization.interface";
import { CreateAddressUseCaseRequest } from "./address.types";

export type CreateOrganizationUseCaseRequest = {
    userId: string;
    name: string;
    phone: string;
    address: CreateAddressUseCaseRequest;
}

export type CreateOrganizationUseCaseResponse = {
    organization: Organization & {
        address: Address
    };
}

export interface BodyOrganization {
    name: string;
    phone: string;
    postalCode: string;
    uf: string;
    country: string;
    city: string;
    province: string;
    neighbourhood: string;
    lat: string;
    lng: string;
}
