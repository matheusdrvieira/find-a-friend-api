/* eslint-disable no-multiple-empty-lines */
import { FindByIdPet, FindManyPet, Pet, PetsToAdopt } from "@/application/interfaces/pet.interface";
import { randomUUID } from "crypto";
import { PetRepository } from "../repositories/pet-repository";

export class PetInMemory implements PetRepository {
    public PET: Pet[] = [];

    async create(data: Pet): Promise<Pet> {
        const pet = {
            id: randomUUID(),
            typeId: data.typeId,
            organizationId: data.organizationId,
            age: data.age,
            description: data.description,
            energyLevels: data.energyLevels,
            environment: data.environment,
            independenceLevels: data.independenceLevels,
            name: data.name,
            size: data.size,
            toAdopt: true,
            createdAt: new Date()
        };

        this.PET.push(pet);

        return pet;
    }


    async findMany(data: FindManyPet): Promise<PetsToAdopt> {
        const filteredPets = this.PET.filter((pet) => {
            return (
                pet.toAdopt === true &&
                    data.age ? pet.age === data.age : true &&
                        data.energyLevels ? pet.energyLevels === data.energyLevels : true &&
                            data.independenceLevels ? pet.independenceLevels === data.independenceLevels : true &&
                                data.size ? pet.size === data.size : true
            );
        });

        const count = filteredPets.length;

        const paginatedPets = filteredPets.slice((data.skip - 1) * data.take, data.skip * data.take);

        const pagination = {
            skip: data.skip,
            take: data.take,
            total: count,
        };

        return { pets: paginatedPets, pagination };
    }

    async findById(data: FindByIdPet): Promise<Pet | null> {
        const pet = this.PET.find((p) => p.id == data.id);

        if (!pet) return null;

        return pet;
    }
}
