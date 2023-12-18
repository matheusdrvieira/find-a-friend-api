import { app } from "@/app";
import { UserTypeEnum } from "@/application/enum/user.enum";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("create user (e2e)", async () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to create a user", async () => {
        const response = await request(app.server).post("/users").send({
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        expect(response.statusCode).toEqual(201);
        expect(response.body).toEqual({ message: "User Created Successfully!" });
    });

    it("should be able to throw an error if the user's email already exists", async () => {
        await request(app.server).post("/users").send({
            name: "Joe Doe 2",
            email: "joedoe2@gmail.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        const response = await request(app.server).post("/users").send({
            name: "Joe Doe 2",
            email: "joedoe2@gmail.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        const RESPONSE_MESSAGE = {
            message: "E-mail already exists: joedoe2@gmail.com",
            name: "CreateUserEmailException",
        };

        expect(response.body).toEqual(RESPONSE_MESSAGE);
    });

    it("should be able to raise an error if a user creation fails due to validation errors", async () => {
        const response = await request(app.server).post("/users").send({
            name: "Joe Doe 3",
            email: "joedoe3",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        expect(response.statusCode).toEqual(400);
        expect(response.body.message).toEqual("Validation Error!");
    });
});
