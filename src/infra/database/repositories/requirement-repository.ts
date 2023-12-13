import { Requirement } from "@/application/interfaces/requirement.inteface";

export interface RequirementRepository {
    create(data: Requirement): Promise<Requirement>;
}
