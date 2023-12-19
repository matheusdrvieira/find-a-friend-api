import { app } from "@/app";
import { PetEnergyLevelsEnum, PetEnvironmentEnum, PetIndependenceLevelsEnum, PetSizeEnum } from "@/application/enum/pet.enum";
import { authResponseAdmin } from "@/test/create-session-admin.test";
import { authResponse } from "@/test/create-session.test";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("create pet (e2e)", async () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to list by id a pet", async () => {
        const usertAdmin = await authResponseAdmin(app);

        const petTypeId = await request(app.server)
            .post("/pet/type")
            .set("Authorization", `Bearer ${usertAdmin.token}`)
            .send({
                name: "Dog",
            });

        const { token } = await authResponse(app);

        const responseOrganization = await request(app.server)
            .post("/organizations")
            .set("Authorization", `Bearer ${token}`)
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

        const [cookie] = responseOrganization.get("Set-Cookie");

        const responsePet = await request(app.server)
            .post("/pets")
            .set("Authorization", `Bearer ${token}`)
            .set("Cookie", cookie)
            .send({
                typeId: petTypeId.body.typeId,
                name: "name",
                pictures: ["url", "url", "url"],
                requirements: ["pet", "pet", "pet"],
                description: "description",
                age: 18,
                size: PetSizeEnum.MEDIUM,
                environment: PetEnvironmentEnum.SMALL,
                energyLevels: PetEnergyLevelsEnum.HIGH,
                independenceLevels: PetIndependenceLevelsEnum.LOW,
                toAdopt: true
            });

        const { petId } = responsePet.body;

        const response = await request(app.server)
            .get(`/pets/${petId}`)
            .set("Authorization", `Bearer ${token}`)
            .send();

        expect(response.statusCode).toEqual(200);
    });
});
