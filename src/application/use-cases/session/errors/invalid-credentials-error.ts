import { UseCaseError } from "@/application/errors/use-case-error";

export class SessionCredentialsException extends UseCaseError {
    constructor(err: string) {
        super(`session credentials with error: ${err && err}`);
        this.name = "SessionCredentialsException";
    }
}
