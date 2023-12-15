import { PetEnergyLevelsEnum, PetEnvironmentEnum, PetIndependenceLevelsEnum, PetSizeEnum } from "@/application/enum/pet.enum";
import { PetInMemory } from "@/infra/database/repositories-in-memory/pet.in-memory";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { ListPetException } from "./errors/pet-not-exists-error";
import { FindManyPetUseCase } from "./findMany-pet.use-case";

describe("FindMany pet Use Case", async () => {
    let repositoryInMemory: PetInMemory;
    let findManyPetUseCase: FindManyPetUseCase;

    beforeEach(() => {
        repositoryInMemory = new PetInMemory();
        findManyPetUseCase = new FindManyPetUseCase(repositoryInMemory);
    });

    const petRepositoryMock = {
        findMany: vi.fn(),
        create: vi.fn(),
        findById: vi.fn()
    };

    it("should findMany filterd age", async () => {
        await createPetRepository(repositoryInMemory);

        const query = {
            age: 6,
            city: "sao carlos",
            uf: "sp",
            take: 20,
            skip: 1
        };

        const { pet } = await findManyPetUseCase.execute(query);

        const RESPONSE_OBJECT_MESSAGE = [{
            id: expect.any(String),
            typeId: "type-1",
            organizationId: "org-1",
            age: 6,
            description: "string",
            energyLevels: PetEnergyLevelsEnum.HIGH,
            environment: PetEnvironmentEnum.LARGE,
            independenceLevels: PetIndependenceLevelsEnum.HIGH,
            name: "rex",
            size: PetSizeEnum.LARGE,
            toAdopt: true,
            createdAt: expect.any(Date),
        }];

        expect(pet.pets).toMatchObject(RESPONSE_OBJECT_MESSAGE);
    });

    it("should findMany filterd size", async () => {
        await createPetRepository(repositoryInMemory);

        const query = {
            size: PetSizeEnum.SMALL,
            city: "sao carlos",
            uf: "sp",
            take: 20,
            skip: 1
        };

        const { pet } = await findManyPetUseCase.execute(query);

        const RESPONSE_OBJECT_MESSAGE = [{
            id: expect.any(String),
            typeId: "type-3",
            organizationId: "org-3",
            age: 8,
            description: "string",
            energyLevels: PetEnergyLevelsEnum.LOW,
            environment: PetEnvironmentEnum.SMALL,
            independenceLevels: PetIndependenceLevelsEnum.LOW,
            name: "rex",
            size: PetSizeEnum.SMALL,
            toAdopt: true,
            createdAt: expect.any(Date),
        }];

        expect(pet.pets).toMatchObject(RESPONSE_OBJECT_MESSAGE);
    });

    it("should findMany filterd independenceLevels", async () => {
        await createPetRepository(repositoryInMemory);

        const query = {
            independenceLevels: PetIndependenceLevelsEnum.MEDIUM,
            city: "sao carlos",
            uf: "sp",
            take: 20,
            skip: 1
        };

        const { pet } = await findManyPetUseCase.execute(query);

        const RESPONSE_OBJECT_MESSAGE = [{
            id: expect.any(String),
            typeId: "type-2",
            organizationId: "org-2",
            age: 2,
            description: "string",
            energyLevels: PetEnergyLevelsEnum.MEDIUM,
            environment: PetEnvironmentEnum.MEDIUM,
            independenceLevels: PetIndependenceLevelsEnum.MEDIUM,
            name: "rex",
            size: PetSizeEnum.MEDIUM,
            toAdopt: true,
            createdAt: expect.any(Date),
        }];

        expect(pet.pets).toMatchObject(RESPONSE_OBJECT_MESSAGE);
    });

    it("should findMany filterd energyLevels", async () => {
        await createPetRepository(repositoryInMemory);

        const query = {
            energyLevels: PetEnergyLevelsEnum.LOW,
            city: "sao carlos",
            uf: "sp",
            take: 20,
            skip: 1
        };

        const { pet } = await findManyPetUseCase.execute(query);

        const RESPONSE_OBJECT_MESSAGE = [{
            id: expect.any(String),
            typeId: "type-3",
            organizationId: "org-3",
            age: 8,
            description: "string",
            energyLevels: PetEnergyLevelsEnum.LOW,
            environment: PetEnvironmentEnum.SMALL,
            independenceLevels: PetIndependenceLevelsEnum.LOW,
            name: "rex",
            size: PetSizeEnum.SMALL,
            toAdopt: true,
            createdAt: expect.any(Date),
        }];

        expect(pet.pets).toMatchObject(RESPONSE_OBJECT_MESSAGE);
    });

    it("should be able to find for all pets if there is no filter", async () => {
        await createPetRepository(repositoryInMemory);

        const query = {
            city: "sao carlos",
            uf: "sp",
            take: 20,
            skip: 1
        };

        const { pet } = await findManyPetUseCase.execute(query);

        const RESPONSE_OBJECT_MESSAGE = [{
            id: expect.any(String),
            typeId: "type-1",
            organizationId: "org-1",
            age: 6,
            description: "string",
            energyLevels: PetEnergyLevelsEnum.HIGH,
            environment: PetEnvironmentEnum.LARGE,
            independenceLevels: PetIndependenceLevelsEnum.HIGH,
            name: "rex",
            size: PetSizeEnum.LARGE,
            toAdopt: true,
            createdAt: expect.any(Date),
        },
        {
            id: expect.any(String),
            typeId: "type-2",
            organizationId: "org-2",
            age: 2,
            description: "string",
            energyLevels: PetEnergyLevelsEnum.MEDIUM,
            environment: PetEnvironmentEnum.MEDIUM,
            independenceLevels: PetIndependenceLevelsEnum.MEDIUM,
            name: "rex",
            size: PetSizeEnum.MEDIUM,
            toAdopt: true,
            createdAt: expect.any(Date),
        },
        {
            id: expect.any(String),
            typeId: "type-3",
            organizationId: "org-3",
            age: 8,
            description: "string",
            energyLevels: PetEnergyLevelsEnum.LOW,
            environment: PetEnvironmentEnum.SMALL,
            independenceLevels: PetIndependenceLevelsEnum.LOW,
            name: "rex",
            size: PetSizeEnum.SMALL,
            toAdopt: true,
            createdAt: expect.any(Date),
        }];

        expect(pet.pets).toMatchObject(RESPONSE_OBJECT_MESSAGE);
        expect(pet.pets).length(3);
    });

    it("should be able to throw an error if the listing fails", async () => {
        petRepositoryMock.findMany.mockRejectedValue(new Error());
        const findManyPetUseCase = new FindManyPetUseCase(petRepositoryMock);

        const query = {
            city: "sao carlos",
            uf: "sp",
            take: 20,
            skip: 1
        };

        await expect(() => findManyPetUseCase.execute(query)).rejects.toThrow(ListPetException);
    });
});

async function createPetRepository(repositoryInMemory: PetInMemory) {
    await repositoryInMemory.create({
        typeId: "type-1",
        organizationId: "org-1",
        age: 6,
        description: "string",
        energyLevels: PetEnergyLevelsEnum.HIGH,
        environment: PetEnvironmentEnum.LARGE,
        independenceLevels: PetIndependenceLevelsEnum.HIGH,
        name: "rex",
        size: PetSizeEnum.LARGE,
        toAdopt: true,
        createdAt: new Date(),
    });

    await repositoryInMemory.create({
        typeId: "type-2",
        organizationId: "org-2",
        age: 2,
        description: "string",
        energyLevels: PetEnergyLevelsEnum.MEDIUM,
        environment: PetEnvironmentEnum.MEDIUM,
        independenceLevels: PetIndependenceLevelsEnum.MEDIUM,
        name: "rex",
        size: PetSizeEnum.MEDIUM,
        toAdopt: true,
        createdAt: new Date(),
    });

    await repositoryInMemory.create({
        typeId: "type-3",
        organizationId: "org-3",
        age: 8,
        description: "string",
        energyLevels: PetEnergyLevelsEnum.LOW,
        environment: PetEnvironmentEnum.SMALL,
        independenceLevels: PetIndependenceLevelsEnum.LOW,
        name: "rex",
        size: PetSizeEnum.SMALL,
        toAdopt: true,
        createdAt: new Date(),
    });
}

