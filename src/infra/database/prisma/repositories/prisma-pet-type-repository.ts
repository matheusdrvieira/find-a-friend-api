import { PetType } from "@/application/interfaces/pet-type.interface";
import { prisma } from "@/infra/database/lib/prisma";
import { PetTypeRepository } from "../../repositories/pet-type-repository";
import { convertToDomain, convertToPrisma } from "../mappers/pet-type.mappers";

export class PrismaPetTypeRepository implements PetTypeRepository {
    async create(data: PetType): Promise<PetType> {
        const petType = await prisma.petType.create({
            data: convertToPrisma(data),
        });

        return convertToDomain(petType);
    }
}
