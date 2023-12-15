import { RequirementInMemory } from "@/infra/database/repositories-in-memory/requirement.in-memory copy";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateRequirementUseCase } from "./create-requirement.use-case";
import { CreateRequirementException } from "./errors/requirement-already-exists-error";

describe("Create Requirement Use Case ", async () => {
    let requirementInMemory: RequirementInMemory;
    let sut: CreateRequirementUseCase;

    const requirementRepositoryMock = {
        create: vi.fn(),
    };

    beforeEach(() => {
        requirementInMemory = new RequirementInMemory();
        sut = new CreateRequirementUseCase(requirementInMemory);
    });

    it("should be able to create an requirement", async () => {
        const createSpyResponse = vi.spyOn(requirementInMemory, "create");

        expect(() => sut.execute({
            petId: randomUUID(),
            requirements: ["url", "url", "url"]
        })).not.toThrow();

        expect(createSpyResponse).toHaveBeenCalled();
    });

    it("should be able to throw an error if creating an Requirement fails", async () => {
        requirementRepositoryMock.create.mockRejectedValue(new Error());
        const createRequirementUseCase = new CreateRequirementUseCase(requirementRepositoryMock);

        expect(() => createRequirementUseCase.execute({
            petId: randomUUID(),
            requirements: ["url", "url", "url"]
        })).rejects.toThrow(CreateRequirementException);
    });
});

