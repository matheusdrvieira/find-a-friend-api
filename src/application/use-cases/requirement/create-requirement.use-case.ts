import { CreateRequirementUseCaseRequest } from "@/application/types/requirement.type";
import { RequirementRepository } from "@/infra/database/repositories/requirement-repository";
import { CreateRequirementException } from "./errors/requirement-already-exists-error";

export class CreateRequirementUseCase {
    constructor(private requirementRepository: RequirementRepository) { }

    public execute = async (body: CreateRequirementUseCaseRequest) => {
        try {
            const { requirements, petId } = body;

            for (const requirement of requirements) {
                await this.requirementRepository.create({
                    petId,
                    description: requirement,
                });
            }

        } catch (err) {

            throw new CreateRequirementException((err as Error).message);
        }
    };
}
