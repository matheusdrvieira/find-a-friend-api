import { PetEnergyLevelsEnum, PetEnvironmentEnum, PetIndependenceLevelsEnum, PetSizeEnum } from "@/application/enum/pet.enum";
import { PetInMemory } from "@/infra/database/repositories-in-memory/pet.in-memory";
import { describe, expect, it } from "vitest";
import { GenericPetException } from "./errors/pet-generic-error";
import { FindPetByIdUseCase } from "./findById-pet.use-case";

describe("FindById pet Use Case", async () => {
    it("should be able find a pet by id", async () => {
        const repositoryInMemory = new PetInMemory();
        const findPetByIdUseCase = new FindPetByIdUseCase(repositoryInMemory);

        const { id } = await repositoryInMemory.create({
            id: "e5f5b1f0-c3cf-44bd-9ab2-585693acaaad",
            typeId: "type-1",
            organizationId: "org-1",
            age: 6,
            description: "string",
            energyLevels: PetEnergyLevelsEnum.HIGH,
            environment: PetEnvironmentEnum.MEDIUM,
            independenceLevels: PetIndependenceLevelsEnum.LOW,
            name: "rex",
            size: PetSizeEnum.SMALL,
            toAdopt: true,
            createdAt: new Date(),
        });

        const { pet } = await findPetByIdUseCase.execute({
            id: id!
        });

        const RESPONSE_OBJECT_MESSAGE = {
            id: expect.any(String),
            typeId: expect.any(String),
            organizationId: expect.any(String),
            age: 6,
            description: "string",
            energyLevels: PetEnergyLevelsEnum.HIGH,
            environment: PetEnvironmentEnum.MEDIUM,
            independenceLevels: PetIndependenceLevelsEnum.LOW,
            name: "rex",
            size: PetSizeEnum.SMALL,
            toAdopt: true,
            createdAt: expect.any(Date)
        };

        expect(pet).toMatchObject(RESPONSE_OBJECT_MESSAGE);
    });

    it("should be able to throw an error when repository generic error", async () => {
        const petRepositoryMock = new PetInMemory();
        const createPetUseCase = new FindPetByIdUseCase(petRepositoryMock);

        expect(() => createPetUseCase.execute({
            id: "e5f5b1f0-c3cf-44bd-9ab2-585693acaaad"
        })).rejects.toThrow(GenericPetException);
    });
});
