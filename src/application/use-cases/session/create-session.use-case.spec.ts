import { UserRoleEnum, UserTypeEnum } from "@/application/enum/user.enum";
import { UserInMemory } from "@/infra/database/repositories-in-memory/user.in-memory";
import { hash } from "bcryptjs";
import { beforeEach, describe, expect, it } from "vitest";
import { CreateSessionUseCase } from "./create-session.use-case";
import { SessionCredentialsException } from "./errors/invalid-credentials-error";

describe("Create Session Use Case ", async () => {
    let userInMemory: UserInMemory;
    let sut: CreateSessionUseCase;

    beforeEach(() => {
        userInMemory = new UserInMemory();
        sut = new CreateSessionUseCase(userInMemory);
    });

    it("should be able to create a session", async () => {
        await userInMemory.create({
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: await hash("123456", 8),
            type: UserTypeEnum.ADOPTER,
            role: UserRoleEnum.BASIC
        });

        const { user } = await sut.execute({
            email: "joedoe@gmail.com",
            password: "123456"
        });

        const RESPONSE_OBJECT_MESSAGE = {
            id: expect.any(String),
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: expect.any(String),
            role: "BASIC",
            type: "ADOPTER",
            createdAt: expect.any(Date)
        };

        expect(user).toEqual(expect.objectContaining(RESPONSE_OBJECT_MESSAGE));
    });

    it("should not be able to create a session with wrong password", async () => {
        await userInMemory.create({
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: await hash("123456", 8),
            type: UserTypeEnum.ADOPTER,
            role: UserRoleEnum.BASIC
        });

        await expect(() => sut.execute({
            email: "joedoe@gmail.com",
            password: "123654"
        })).rejects.toThrow(SessionCredentialsException);
    });

    it("should not be able to create a session with wrong email", async () => {
        await expect(() => sut.execute({
            email: "joedoe@gmail.com",
            password: "123456"
        })).rejects.toThrow(SessionCredentialsException);
    });
});
