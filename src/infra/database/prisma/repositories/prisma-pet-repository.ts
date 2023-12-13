import { Pet } from "@/application/interfaces/pet.interface";
import { prisma } from "@/infra/database/lib/prisma";
import { PetRepository } from "../../repositories/pet-repository";
import { convertToDomain, convertToPrisma } from "../mappers/pet.mappers";

export class PrismaPetRepository implements PetRepository {
    async create(data: Pet): Promise<Pet> {
        const pet = await prisma.pet.create({
            data: convertToPrisma(data),
        });

        return convertToDomain(pet);
    }
}
