import { UserTypeEnum } from "@/application/enum/user.enum";
import { PRISMA_UNIQUE_KEY_EXECEPTION_CODE } from "@/infra/database/prisma/constants/prisma.constants";
import { UserInMemory } from "@/infra/database/repositories-in-memory/user.in-memory";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { CreateUserUseCase } from "./create-user.use-case";
import { CreateUserEmailException } from "./errors/email-already-exists-error";
import { CreateUserException } from "./errors/user-already-exists-error";

describe("Create User Use Case", async () => {
    let userInMemory: UserInMemory;
    let sut: CreateUserUseCase;

    const userRepositoryMock = {
        create: vi.fn(),
        findByEmail: vi.fn()
    };

    beforeEach(() => {
        userInMemory = new UserInMemory();
        sut = new CreateUserUseCase(userInMemory);
    });

    it("should be able to create a user", async () => {
        const { user } = await sut.execute({
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        expect(user).toMatchObject({
            id: expect.any(String),
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: expect.any(String),
            type: UserTypeEnum.ADOPTER
        });
    });

    it("Cannot create user when duplicated e-mail", async () => {
        userRepositoryMock.create.mockRejectedValue({ code: PRISMA_UNIQUE_KEY_EXECEPTION_CODE });

        const createUserUseCase = new CreateUserUseCase(userRepositoryMock);

        const EMAIL_DUPLICATED = "joedoe@gmail.com";

        await expect(() => createUserUseCase.execute({
            name: "Joe Doe",
            email: EMAIL_DUPLICATED,
            password: "123456",
            type: UserTypeEnum.ADOPTER
        })).rejects.toThrow(CreateUserEmailException);
    });

    it("Cannot create user when generic error", async () => {
        userRepositoryMock.create.mockRejectedValue(new Error());

        const createUserUseCase = new CreateUserUseCase(userRepositoryMock);

        await expect(() => createUserUseCase.execute({
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        })).rejects.toThrow(CreateUserException);
    });
});
