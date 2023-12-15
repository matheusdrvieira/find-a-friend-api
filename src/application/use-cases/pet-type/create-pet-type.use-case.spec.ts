import { PetTypeInMemory } from "@/infra/database/repositories-in-memory/pet-type.in-memory";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreatePetTypeUseCase } from "./create-pet-type.use-case";
import { CreatePetTypeException } from "./errors/pet-type-already-exists-error";

describe("Create Pet Type Use Case ", async () => {
    let petTypeInMemory: PetTypeInMemory;
    let sut: CreatePetTypeUseCase;

    const petTypeRepositoryMock = {
        create: vi.fn(),
    };

    beforeEach(() => {
        petTypeInMemory = new PetTypeInMemory();
        sut = new CreatePetTypeUseCase(petTypeInMemory);
    });

    it("should be able to create a type of pet", async () => {
        const { petType } = await sut.execute({
            name: "Dog"
        });

        expect(petType).toMatchObject({
            id: expect.any(String),
            name: "Dog",
            createdAt: expect.any(Date)
        });
    });

    it("should be able to throw an error if creating a petType fails", async () => {
        petTypeRepositoryMock.create.mockRejectedValue(new Error());
        const createPetTypeUseCase = new CreatePetTypeUseCase(petTypeRepositoryMock);

        expect(() => createPetTypeUseCase.execute({
            name: "Dog"
        })).rejects.toThrow(CreatePetTypeException);
    });
});
