import { PictureInMemory } from "@/infra/database/repositories-in-memory/picture.in-memory";
import { randomUUID } from "crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreatePictureUseCase } from "./create-picture.use-case";
import { CreatePictureException } from "./errors/picture-already-exists-error";

describe("Create Picture Use Case ", async () => {
    let pictureInMemory: PictureInMemory;
    let sut: CreatePictureUseCase;

    const pictureRepositoryMock = {
        create: vi.fn(),
    };

    beforeEach(() => {
        pictureInMemory = new PictureInMemory();
        sut = new CreatePictureUseCase(pictureInMemory);
    });

    it("should be able to create an picture", async () => {
        const createSpyResponse = vi.spyOn(pictureInMemory, "create");

        expect(() => sut.execute({
            petId: randomUUID(),
            pictures: ["url", "url", "url"]
        })).not.toThrow();

        expect(createSpyResponse).toHaveBeenCalled();
    });

    it("should be able to throw an error if creating an image fails", async () => {
        pictureRepositoryMock.create.mockRejectedValue(new Error());
        const createPictureUseCase = new CreatePictureUseCase(pictureRepositoryMock);

        expect(() => createPictureUseCase.execute({
            petId: randomUUID(),
            pictures: ["url", "url", "url"]
        })).rejects.toThrow(CreatePictureException);
    });
});
