import { UseCaseError } from "@/application/errors/use-case-error";

export class CreateRefreshTokenException extends UseCaseError {
    constructor(err: string) {
        super(`Cannot create refreshToken with error: ${err && err}`);
        this.name = "CreateRefreshTokenException";
    }
}
