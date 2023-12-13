import { Address } from "../interfaces/address.interface";

export type CreateAddressUseCaseRequest = {
    postalCode: string;
    uf: string;
    country: string;
    city: string;
    province: string;
    neighbourhood: string;
    lat: string;
    lng: string;
}

export type CreateAddressUseCaseResponse = {
    address: Address;
}
