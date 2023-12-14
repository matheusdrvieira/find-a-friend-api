import { UseCaseError } from "@/application/errors/use-case-error";

export class GenericPetException extends UseCaseError {
    constructor(err: string) {
        super(`Pet with error: ${err && err}`);
        this.name = "GenericPetException";
    }
}
