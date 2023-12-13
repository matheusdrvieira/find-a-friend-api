import { AddressInMemory } from "@/infra/database/repositories-in-memory/address.in-memory";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateAddressUseCase } from "./create-address.use-case";
import { CreateAddressException } from "./errors/address-already-exists-error";

describe("Create Address Use Case ", async () => {
    let addressInMemory: AddressInMemory;
    let sut: CreateAddressUseCase;

    const addressRepositoryMock = {
        create: vi.fn(),
    };

    beforeEach(() => {
        addressInMemory = new AddressInMemory();
        sut = new CreateAddressUseCase(addressInMemory);
    });

    it("should be able to create a address", async () => {
        const { address } = await sut.execute({
            postalCode: "string",
            uf: "string",
            country: "string",
            city: "string",
            province: "string",
            neighbourhood: "string",
            lat: "string",
            lng: "string"
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

        expect(address).toMatchObject(MESSAGE_RESPONSE_ADDRESS);
    });

    it("should be able to throw an error if creating an address fails", async () => {
        addressRepositoryMock.create.mockRejectedValue(new Error());
        const createUserUseCase = new CreateAddressUseCase(addressRepositoryMock);

        expect(() => createUserUseCase.execute({
            postalCode: "string",
            uf: "string",
            country: "string",
            city: "string",
            province: "string",
            neighbourhood: "string",
            lat: "string",
            lng: "string"
        })).rejects.toThrow(CreateAddressException);
    });
});
