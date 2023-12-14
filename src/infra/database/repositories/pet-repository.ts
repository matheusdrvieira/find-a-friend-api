import { FindByIdPet, FindManyPet, Pet, PetsToAdopt } from "@/application/interfaces/pet.interface";

export interface PetRepository {
    create(data: Pet): Promise<Pet>;
    findMany(data: FindManyPet): Promise<PetsToAdopt>
    findById(data: FindByIdPet): Promise<Pet | null>
}
