import { randomUUID } from "crypto";
import { describe, expect, it, vi } from "vitest";
import { CreateOrganizationUseCase } from "./create-organization.use-case";
import { CreateOrganizationException } from "./errors/organization-already-exists-error";

describe("Create Organization Use Case ", async () => {
    const organizationRepositoryMock = {
        create: vi.fn(),
    };

    const address = {
        postalCode: "string",
        uf: "string",
        country: "string",
        city: "string",
        province: "string",
        neighbourhood: "string",
        lat: "string",
        lng: "string"
    };

    it("should be able to throw an error if creating an organization fails", async () => {
        organizationRepositoryMock.create.mockRejectedValue(new Error());
        const createOrganizationUseCase = new CreateOrganizationUseCase(organizationRepositoryMock);

        await expect(() => createOrganizationUseCase.execute({
            userId: randomUUID(),
            address: address,
            name: "TypeScript",
            phone: "(99) 9.9999-9999"
        })).rejects.toThrow(CreateOrganizationException);
    });
});
