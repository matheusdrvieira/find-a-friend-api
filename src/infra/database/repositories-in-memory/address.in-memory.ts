import { Address } from "@/application/interfaces/address.interface";
import { randomUUID } from "crypto";
import { AddressRepository } from "../repositories/address-repository";

export class AddressInMemory implements AddressRepository {
    public ADDRESS: Address[] = [];

    async create(data: Address): Promise<Address> {
        const address = {
            id: randomUUID(),
            postalCode: data.postalCode,
            uf: data.uf,
            country: data.country,
            city: data.city,
            province: data.province,
            neighbourhood: data.neighbourhood,
            lat: data.lat,
            lng: data.lng,
            createdAt: new Date(),
        };

        this.ADDRESS.push(address);

        return address;
    }
}
