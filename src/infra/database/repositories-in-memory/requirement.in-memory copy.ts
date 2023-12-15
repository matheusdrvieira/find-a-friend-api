import { Requirement } from "@/application/interfaces/requirement.inteface";
import { randomUUID } from "crypto";
import { RequirementRepository } from "../repositories/requirement-repository";

export class RequirementInMemory implements RequirementRepository {
    public REQUIREMENT: Requirement[] = [];

    async create(data: Requirement): Promise<any> { //eslint-disable-line
        for (const requirement of data.description) {
            const req = {
                id: randomUUID(),
                petId: data.petId,
                description: requirement,
                createdAt: new Date()
            };

            this.REQUIREMENT.push(req);
        }
    }
}
