import { UseCaseError } from "@/application/errors/use-case-error";

export class CreateUserException extends UseCaseError {
    constructor(err: string) {
        super(`Cannot create user with error: ${err && err}`);
        this.name = "CreateUserException";
    }
}
