import { UserTypeEnum } from "@/application/enum/user.enum";
import { FastifyInstance } from "fastify";
import request from "supertest";
import { Session } from "./types/user.type";

export async function authResponse(app: FastifyInstance): Promise<Session> {
    await request(app.server).post("/users").send({
        name: "Joe Doe",
        email: "joedoe@gmail.com",
        password: "123456",
        type: UserTypeEnum.ADOPTER
    });

    const token = await request(app.server).post("/sessions").send({
        email: "joedoe@gmail.com",
        password: "123456",
    });

    return {
        token: token.body.token
    };
}
