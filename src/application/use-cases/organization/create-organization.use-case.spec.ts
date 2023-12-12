import { OrganizationInMemory } from "@/infra/database/repositories-in-memory/organization.in-memory";
import { randomUUID } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateAddressUseCase } from "../address/create-address.use-case";
import { CreateOrganizationUseCase } from "./create-organization.use-case";

describe("Create Organization Use Case ", async () => {
    let organizationInMemory: OrganizationInMemory;
    let sut: CreateOrganizationUseCase;

    vi.mock("../address/create-address.use-case");

    const addressRepositoryMock = {
        create: vi.fn(),
    };

    beforeEach(() => {
        organizationInMemory = new OrganizationInMemory();
        sut = new CreateOrganizationUseCase(organizationInMemory);
    });

    it("should be able to create a organization", async () => {

        addressRepositoryMock.create.mockResolvedValue({});
        const mockedAdreesUseCase = new CreateAddressUseCase(addressRepositoryMock);

        mockedAdreesUseCase.execute = vi.fn().mockReturnValue({});

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

        const { organization } = await sut.execute({
            name: "Joe Doe",
            phone: "123456789",
            address: address,
            userId: randomUUID()
        });

        const MESSAGE_RESPONSE_ADDRESS = {
            id: expect.any(String),
            postalCode: "string",
            uf: "string",
            country: "string",
            city: "string",
            province: "string",
            neighbourhood: "string",
            lat: "string",
            lng: "string",
            createdAt: expect.any(Date),
        };

        const MESSAGE_RESPONSE_ORGANIZATION = {
            id: expect.any(String),
            userId: expect.any(String),
            addressId: expect.any(String),
            address: expect.objectContaining(MESSAGE_RESPONSE_ADDRESS),
            name: "Joe Doe",
            phone: "123456789",
            createdAt: expect.any(Date)
        };

        expect(organization).toMatchObject(MESSAGE_RESPONSE_ORGANIZATION);
    });
});
