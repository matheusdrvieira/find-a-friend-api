import { Pet } from "@/application/interfaces/pet.interface";

export interface PetRepository {
    create(data: Pet): Promise<Pet>;
}
