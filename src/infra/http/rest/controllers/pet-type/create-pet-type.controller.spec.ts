import { app } from "@/app";
import { authResponseAdmin } from "@/test/create-session-admin.test";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("create pet type (e2e)", async () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to create a pet type", async () => {
        const { token } = await authResponseAdmin(app);

        const response = await request(app.server)
            .post("/pet/type")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Dog",
            });

        expect(response.statusCode).toEqual(201);
    });
});
