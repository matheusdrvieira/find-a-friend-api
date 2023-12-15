import { UseCaseError } from "@/application/errors/use-case-error";

export class ListPetException extends UseCaseError {
    constructor(err: string) {
        super(`Cannot list Pet with error: ${err && err}`);
        this.name = "ListPetException";
    }
}
