import { UseCaseError } from "@/application/errors/use-case-error";

export class CreatePetTypeException extends UseCaseError {
    constructor(err: string) {
        super(`Cannot create PetType with error: ${err && err}`);
        this.name = "CreatePetTypeException";
    }
}
