import { Address } from "@/application/interfaces/address.interface";

export interface AddressRepository {
    create(data: Address): Promise<Address>;
}
