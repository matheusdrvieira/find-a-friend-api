import { UseCaseError } from "@/application/errors/use-case-error";

export class CreatePictureException extends UseCaseError {
    constructor(err: string) {
        super(`Cannot create Picture with error: ${err && err}`);
        this.name = "CreatePictureException";
    }
}
