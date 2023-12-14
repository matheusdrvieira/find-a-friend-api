import { FindByIdPet, FindManyPet, Pet, PetsToAdopt } from "@/application/interfaces/pet.interface";
import { prisma } from "@/infra/database/lib/prisma";
import { PetRepository } from "../../repositories/pet-repository";
import { convertGetToDomain } from "../mappers/get-pet.mappers";
import { convertToDomain, convertToPrisma } from "../mappers/pet.mappers";

export class PrismaPetRepository implements PetRepository {
    async create(data: Pet): Promise<Pet> {
        const pet = await prisma.pet.create({
            data: convertToPrisma(data),
        });

        return convertToDomain(pet);
    }

    async findMany(data: FindManyPet): Promise<PetsToAdopt> {
        const where = this.filterPet(data);

        const pet = await prisma.pet.findMany({
            where,
            skip: (data.skip - 1) * data.take,
            take: data.take
        });

        const count = await prisma.pet.count({ where });

        const page = {
            skip: data.skip,
            take: data.take,
            total: count
        };

        return convertGetToDomain(pet, page);
    }

    async findById(data: FindByIdPet): Promise<Pet | null> {
        const pet = await prisma.pet.findUnique({
            where: { id: data.id }
        });

        return pet && convertToDomain(pet);
    }

    private filterPet(data: FindManyPet) {
        return {
            toAdopt: true,
            energyLevels: data.energyLevels,
            independenceLevels: data.independenceLevels,
            size: data.size,
            age: data.age,
            organization: {
                Address: {
                    city: data.city,
                    uf: data.uf
                }
            }
        };
    }
}
