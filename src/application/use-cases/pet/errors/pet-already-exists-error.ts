import { UseCaseError } from "@/application/errors/use-case-error";

export class CreatePetException extends UseCaseError {
    constructor(err: string) {
        super(`Cannot create Pet with error: ${err && err}`);
        this.name = "CreatePetException";
    }
}
