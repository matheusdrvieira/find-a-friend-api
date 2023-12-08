import { PrismaAddressRepository } from "@/infra/database/prisma/repositories/prisma-address-repository";
import { CreateAddressUseCase } from "../use-cases/address/create-address.use-case";

export function makeCreateAddressUseCase() {
    const prismaAddressRepository = new PrismaAddressRepository();
    const createAddressUseCase = new CreateAddressUseCase(prismaAddressRepository);

    return createAddressUseCase;
}
