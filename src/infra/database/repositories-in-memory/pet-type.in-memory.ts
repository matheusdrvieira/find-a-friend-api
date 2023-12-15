import { PetType } from "@/application/interfaces/pet-type.interface";
import { randomUUID } from "crypto";
import { PetTypeRepository } from "../repositories/pet-type-repository";

export class PetTypeInMemory implements PetTypeRepository {
    public PET_TYPE: PetType[] = [];

    async create(data: PetType): Promise<PetType> {
        const petType = {
            id: randomUUID(),
            name: data.name,
            createdAt: new Date()
        };

        this.PET_TYPE.push(petType);

        return petType;
    }
}
