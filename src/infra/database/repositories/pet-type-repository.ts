import { PetType } from "@/application/interfaces/pet-type.interface";

export interface PetTypeRepository {
    create(data: PetType): Promise<PetType>;
}
