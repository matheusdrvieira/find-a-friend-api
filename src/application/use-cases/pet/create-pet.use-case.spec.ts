import { PetEnergyLevelsEnum, PetEnvironmentEnum, PetIndependenceLevelsEnum, PetSizeEnum } from "@/application/enum/pet.enum";
import { PetInMemory } from "@/infra/database/repositories-in-memory/pet.in-memory";
import { randomUUID } from "crypto";
import { describe, expect, it, vi } from "vitest";
import { } from "../../factories/pet/make-create-picture.use-case";
import { CreatePetUseCase } from "./create-pet.use-case";
import { CreatePetException } from "./errors/pet-already-exists-error";

describe("Create pet Use Case", async () => {
    const petRepositoryMock = {
        create: vi.fn(),
        findMany: vi.fn(),
        findById: vi.fn()
    };

    vi.mock("@/application/factories/pet/make-create-picture.use-case", () => ({
        makeCreatePictureUseCase: vi.fn(() => ({
            execute: vi.fn(),
        })),
    }));

    vi.mock("@/application/factories/pet/make-create-requirement.use-case", () => ({
        makeCreateRequirementUseCase: vi.fn(() => ({
            execute: vi.fn(),
        })),
    }));

    it("should be able to raise a pet", async () => {
        const createPetInMemory = new PetInMemory();
        const createPetUseCase = new CreatePetUseCase(createPetInMemory);

        const { pet } = await createPetUseCase.execute({
            typeId: randomUUID(),
            organizationId: randomUUID(),
            age: 6,
            description: "string",
            energyLevels: PetEnergyLevelsEnum.HIGH,
            environment: PetEnvironmentEnum.MEDIUM,
            independenceLevels: PetIndependenceLevelsEnum.LOW,
            name: "rex",
            pictures: ["url", "url", "url"],
            requirements: ["string", "string", "string"],
            size: PetSizeEnum.SMALL,
            toAdopt: true,
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

    it("should be able to throw an error if creating an organization fails", async () => {
        petRepositoryMock.create.mockRejectedValue(new Error());
        const createPetUseCase = new CreatePetUseCase(petRepositoryMock);

        await expect(() => createPetUseCase.execute({
            typeId: randomUUID(),
            organizationId: randomUUID(),
            age: 6,
            description: "string",
            energyLevels: PetEnergyLevelsEnum.HIGH,
            environment: PetEnvironmentEnum.MEDIUM,
            independenceLevels: PetIndependenceLevelsEnum.LOW,
            name: "rex",
            pictures: ["url", "url", "url"],
            requirements: ["string", "string", "string"],
            size: PetSizeEnum.SMALL,
            toAdopt: true,
        })).rejects.toThrow(CreatePetException);
    });
});
