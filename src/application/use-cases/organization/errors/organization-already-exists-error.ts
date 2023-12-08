import { UseCaseError } from "@/application/errors/use-case-error";

export class CreateOrganizationException extends UseCaseError {
    constructor(err: string) {
        super(`Cannot create Organization with error: ${err && err}`);
        this.name = "CreateOrganizationException";
    }
}
