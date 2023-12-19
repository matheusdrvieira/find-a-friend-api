import { UserRoleEnum, UserTypeEnum } from "@/application/enum/user.enum";
import { PrismaUserRepository } from "@/infra/database/prisma/repositories/prisma-user-repository";
import { hash } from "bcryptjs";
import { FastifyInstance } from "fastify";
import request from "supertest";
import { Session } from "./types/user.type";

export async function authResponseAdmin(app: FastifyInstance): Promise<Session> {
    const prismaUserRepository = new PrismaUserRepository();

    await prismaUserRepository.create({
        name: "Joe Doe",
        email: "joedoe@example.com",
        password: await hash("123456", 8),
        type: UserTypeEnum.ADOPTER,
        role: UserRoleEnum.ADMIN,
    });

    const token = await request(app.server).post("/sessions").send({
        email: "joedoe@example.com",
        password: "123456",
    });

    return {
        token: token.body.token
    };
}
