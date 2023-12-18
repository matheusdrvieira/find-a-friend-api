import { app } from "@/app";
import { UserTypeEnum } from "@/application/enum/user.enum";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("create session (e2e)", async () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to create a session", async () => {
        await request(app.server).post("/users").send({
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        const response = await request(app.server).post("/sessions").send({
            email: "joedoe@gmail.com",
            password: "123456",
        });

        expect(response.statusCode).toEqual(201);
    });

    it("should be able to throw an error if credentials are incorrect", async () => {
        await request(app.server).post("/users").send({
            name: "Joe Doe 2",
            email: "joedoe2",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        const response = await request(app.server).post("/sessions").send({
            email: "joedoe3@gmail.com",
            password: "123456",
        });

        expect(response.statusCode).toEqual(409);
    });

    it("should be able to raise an error if session creation fails due to validation errors", async () => {
        await request(app.server).post("/users").send({
            name: "Joe Doe 3",
            email: "joedoe3",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        const response = await request(app.server).post("/sessions").send({
            email: "joedoe",
            password: "123456",
        });

        expect(response.statusCode).toEqual(400);
    });
});
