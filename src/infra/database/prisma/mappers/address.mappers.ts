import { Address } from "@/application/interfaces/address.interface";
import { Address as AddressPrisma, Prisma } from "@prisma/client";

export function convertToPrisma(data: Address): Prisma.AddressUncheckedCreateInput {
    const addressPrisma: Prisma.AddressCreateInput = {
        id: data.id,
        city: data.city,
        country: data.country,
        neighbourhood: data.neighbourhood,
        postalCode: data.postalCode,
        province: data.province,
        uf: data.uf,
        lat: data.lat,
        lng: data.lng,
        createdAt: data.createdAt
    };

    return addressPrisma;
}

export function convertToDomain(data: AddressPrisma): Address {
    const address: Address = {
        id: data.id,
        city: data.city,
        country: data.country,
        neighbourhood: data.neighbourhood,
        postalCode: data.postalCode,
        province: data.province,
        uf: data.uf,
        lat: data.lat,
        lng: data.lng,
        createdAt: data.createdAt
    };

    return address;
}
