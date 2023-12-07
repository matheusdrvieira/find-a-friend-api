import { UserTypeEnum } from "@/application/enum/user.enum";
import { UserInMemory } from "@/infra/database/repositories-in-memory/user.in-memory";
import { compare } from "bcryptjs";
import { describe, expect, it } from "vitest";
import { CreateUserUseCase } from "./create-user.use-case";

describe("Create User Use Case ", () => {
    it("should be able to create a user", async () => {

        const userInMemory = new UserInMemory();
        const createUserUseCase = new CreateUserUseCase(userInMemory);

        const { user } = await createUserUseCase.execute({
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        expect(user).toEqual(user);
    });

    it("should be able to create a hash of the user's password", async () => {

        const userInMemory = new UserInMemory();
        const createUserUseCase = new CreateUserUseCase(userInMemory);

        const { user } = await createUserUseCase.execute({
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        const isPasswordCorrectlyHashed = await compare("123456", user.password);

        expect(isPasswordCorrectlyHashed).toBe(true);
    });
});
