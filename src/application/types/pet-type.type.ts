import { PetType } from "../interfaces/pet-type.interface";

export interface CreatePetTypeUseCaseRequest {
    id?: string;
    name: string;
    createdAt?: Date;
}

export interface CreatePetTypeUseCaseResponse {
    petType: PetType;
}
