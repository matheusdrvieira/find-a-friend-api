import { app } from "@/app";
import { UserTypeEnum } from "@/application/enum/user.enum";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("create Organization (e2e)", async () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to create a pet", async () => {
        await request(app.server).post("/users").send({
            name: "Joe Doe",
            email: "joedoe@gmail.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        const responseToken2 = await request(app.server).post("/sessions").send({
            email: "joedoe@gmail.com",
            password: "123456",
        });

        const response = await request(app.server)
            .post("/organizations")
            .set("Authorization", `Bearer ${responseToken2.body.token}`)
            .send({
                name: "FindAFriend",
                phone: "99999999999",
                uf: "SP",
                country: "brazil",
                city: "São Paulo",
                province: "São Paulo",
                neighbourhood: "São Paulo",
                postalCode: "999999-999",
                lat: "121212121",
                lng: "-12121212"
            });

        expect(response.statusCode).toEqual(201);
    });
});
