import { AddressInMemory } from "@/infra/database/repositories-in-memory/address.in-memory";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateAddressUseCase } from "./create-address.use-case";

describe("Create Address Use Case ", async () => {
    let addressInMemory: AddressInMemory;
    let sut: CreateAddressUseCase;

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
});
