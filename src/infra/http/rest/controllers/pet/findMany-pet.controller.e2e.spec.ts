import { app } from "@/app";
import { PetEnergyLevelsEnum, PetEnvironmentEnum, PetIndependenceLevelsEnum, PetSizeEnum } from "@/application/enum/pet.enum";
import { UserRoleEnum, UserTypeEnum } from "@/application/enum/user.enum";
import { PrismaUserRepository } from "@/infra/database/prisma/repositories/prisma-user-repository";
import { hash } from "bcryptjs";
import request from "supertest";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

describe("find many pets (e2e)", async () => {
    beforeAll(async () => {
        await app.ready();
    });

    afterAll(async () => {
        await app.close();
    });

    it("should be able to list multiple pets", async () => {
        const prismaUserRepository = new PrismaUserRepository();

        await prismaUserRepository.create({
            name: "Joe Doe",
            email: "joedoe@gamil.com",
            password: await hash("123456", 8),
            type: UserTypeEnum.ADOPTER,
            role: UserRoleEnum.ADMIN,
        });

        const responseToken1 = await request(app.server).post("/sessions").send({
            email: "joedoe@gamil.com",
            password: "123456",
        });

        const { token } = responseToken1.body;

        const petTypeId = await request(app.server)
            .post("/pet/type")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Dog",
            });

        await request(app.server).post("/users").send({
            name: "Joe Doe 2",
            email: "joedoe2@gmail.com",
            password: "123456",
            type: UserTypeEnum.ADOPTER
        });

        const responseToken2 = await request(app.server).post("/sessions").send({
            email: "joedoe2@gmail.com",
            password: "123456",
        });

        const responseOrganization = await request(app.server)
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

        const [cookie] = responseOrganization.get("Set-Cookie");

        await request(app.server)
            .post("/pets")
            .set("Authorization", `Bearer ${responseToken2.body.token}`)
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

        await request(app.server)
            .post("/pets")
            .set("Authorization", `Bearer ${responseToken2.body.token}`)
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

        await request(app.server)
            .post("/pets")
            .set("Authorization", `Bearer ${responseToken2.body.token}`)
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

        const response = await request(app.server)
            .get("/pets")
            .set("Authorization", `Bearer ${responseToken2.body.token}`)
            .query({ city: "São Paulo" })
            .query({ uf: "SP" })
            .send();

        expect(response.statusCode).toEqual(200);
    });
});
