import { UseCaseError } from "@/application/errors/use-case-error";

export class CreateAddressException extends UseCaseError {
    constructor(err: string) {
        super(`Cannot create Address with error: ${err && err}`);
        this.name = "CreateAddressException";
    }
}
