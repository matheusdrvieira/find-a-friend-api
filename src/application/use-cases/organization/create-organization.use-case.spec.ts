import { } from "@/application/factories/organization/make-create-address.use-case";
import { OrganizationInMemory } from "@/infra/database/repositories-in-memory/organization.in-memory";
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

    it("should be able to create an organization", async () => {
        vi.mock("@/application/factories/organization/make-create-address.use-case", () => ({
            makeCreateAddressUseCase: vi.fn(() => ({
                execute: vi.fn(() => ({ address: { id: "86f52ca2-a660-4793-9e07-38048904ee2b" } })),
            })),
        }));

        const createOrganizationInMemory = new OrganizationInMemory();
        const createOrganizationUseCase = new CreateOrganizationUseCase(createOrganizationInMemory);

        const { organization } = await createOrganizationUseCase.execute({
            userId: randomUUID(),
            name: "FindAFriend",
            phone: "99 999999999",
            address: address
        });

        const RESPONSE_OBJECT_MESSAGE = {
            id: expect.any(String),
            userId: expect.any(String),
            addressId: "86f52ca2-a660-4793-9e07-38048904ee2b",
            name: "FindAFriend",
            phone: "99 999999999",
            createdAt: expect.any(Date)
        };

        expect(organization).toMatchObject(RESPONSE_OBJECT_MESSAGE);
    });

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
