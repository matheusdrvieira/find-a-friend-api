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
            email: "joedoe@example.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        const response = await request(app.server).post("/sessions").send({
            email: "joedoe@example.com",
            password: "123456",
        });

        expect(response.statusCode).toEqual(201);
    });

    it("should be able to throw an error if credentials are incorrect", async () => {
        await request(app.server).post("/users").send({
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        const response = await request(app.server).post("/sessions").send({
            email: "joedoe@gmail.com",
            password: "123457",
        });

        expect(response.statusCode).toEqual(409);
    });
});
