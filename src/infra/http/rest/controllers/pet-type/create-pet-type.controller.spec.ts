import { app } from "@/app";
import { UserRoleEnum, UserTypeEnum } from "@/application/enum/user.enum";
import { PrismaUserRepository } from "@/infra/database/prisma/repositories/prisma-user-repository";
import { hash } from "bcryptjs";
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
        const prismaUserRepository = new PrismaUserRepository();

        await prismaUserRepository.create({
            name: "Joe Doe",
            email: "joedoe@gamil.com",
            password: await hash("123456", 8),
            type: UserTypeEnum.ADOPTER,
            role: UserRoleEnum.ADMIN,
        });

        const responseToken = await request(app.server).post("/sessions").send({
            email: "joedoe@gamil.com",
            password: "123456",
        });

        const { token } = responseToken.body;

        const response = await request(app.server)
            .post("/pet/type")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "Dog",
            });

        expect(response.statusCode).toEqual(201);
    });

    it("should be able to raise an error if the creation of an pet type fails due to validation errors", async () => {
        const prismaUserRepository = new PrismaUserRepository();

        await prismaUserRepository.create({
            name: "Joe Doe 2",
            email: "joedoe2@gamil.com",
            password: await hash("123456", 8),
            type: UserTypeEnum.ADOPTER,
            role: UserRoleEnum.ADMIN,
        });

        const responseToken = await request(app.server).post("/sessions").send({
            email: "joedoe2@gamil.com",
            password: "123456",
        });

        const { token } = responseToken.body;

        const response = await request(app.server)
            .post("/pet/type")
            .set("Authorization", `Bearer ${token}`)
            .send({
                name: "",
            });

        expect(response.statusCode).toEqual(400);
    });
});
