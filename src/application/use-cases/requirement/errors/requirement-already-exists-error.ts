import { UseCaseError } from "@/application/errors/use-case-error";

export class CreateRequirementException extends UseCaseError {
    constructor(err: string) {
        super(`Cannot create Requirement with error: ${err && err}`);
        this.name = "CreateRequirementException";
    }
}
