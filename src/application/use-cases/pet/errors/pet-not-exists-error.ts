import { UseCaseError } from "@/application/errors/use-case-error";

export class FindPetException extends UseCaseError {
    constructor(err: string) {
        super(`Cannot list Pet with error: ${err && err}`);
        this.name = "FindPetException";
    }
}
