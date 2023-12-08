import { Address } from "@/application/interfaces/address.interface";
import { prisma } from "@/infra/database/lib/prisma";
import { AddressRepository } from "../../repositories/address-repository";
import { convertToDomain, convertToPrisma } from "../mappers/address.mappers";

export class PrismaAddressRepository implements AddressRepository {
    async create(data: Address): Promise<Address> {
        const address = await prisma.address.create({
            data: convertToPrisma(data),
        });

        return convertToDomain(address);
    }
}
