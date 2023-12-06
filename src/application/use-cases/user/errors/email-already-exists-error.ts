import { UseCaseError } from "@/application/errors/use-case-error";

export class CreateUserEmailException extends UseCaseError {
    constructor(err: string) {
        super(`E-mail already exists: ${err}`);
        this.name = "CreateUserEmailException";
    }
}
