import { UseCaseError } from "@/application/errors/use-case-error";

export class CreateSessionException extends UseCaseError {
    constructor(err: string) {
        super(`Cannot create session with error: ${err && err}`);
        this.name = "CreateSessionException";
    }
}
