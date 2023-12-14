import { app } from "@/app";
import { UserTypeEnum } from "@/application/enum/user.enum";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("refresh token (e2e)", async () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to refresh token", async () => {
        await request(app.server).post("/users").send({
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        const authResponse = await request(app.server).post("/sessions").send({
            email: "joedoe@gmail.com",
            password: "123456",
        });

        const cookie = authResponse.get("Set-Cookie");

        const response = await request(app.server).patch("/refresh/token").set("Cookie", cookie).send();

        const MESSAGE_RESPONSE = {
            message: "Refresh Token Created Successfully!",
            token: expect.any(String)
        };

        expect(response.statusCode).toEqual(200);
        expect(response.body).toEqual(expect.objectContaining(MESSAGE_RESPONSE));
        expect(response.get("Set-Cookie")).toEqual([
            expect.stringContaining("refreshToken=")
        ]);
    });
});
