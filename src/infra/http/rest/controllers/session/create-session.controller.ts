
import { createSessionValidate } from "@/application/factories-zod/session/validate-zod";
import { makeCreateSessionUseCase } from "@/application/factories/session/make-create-session.use-case";
import { User } from "@/application/interfaces/user.interface";
import { SessionCredentialsException } from "@/application/use-cases/session/errors/invalid-credentials-error";
import { CreateSessionException } from "@/application/use-cases/session/errors/session-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class SessionController {
    public create = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const sessionValidate = await createSessionValidate(request.body);

            const createSessionUseCase = makeCreateSessionUseCase();
            const { user } = await createSessionUseCase.execute(sessionValidate);

            const token = await this.makeJwtToken(response, user);
            const refreshToken = await this.makeRefreshToken(response, user);

            this.makeRefreshTokenCookie(refreshToken, response);

            return response.status(201).send({ message: "Session Created Successfully!", token });

        } catch (err) {
            if (err instanceof SessionCredentialsException) {
                return response.status(409).send(err.messageException());
            }

            if (err instanceof CreateSessionException) {
                return response.status(400).send(err);
            }

            throw err;
        }
    };

    private async makeJwtToken(response: FastifyReply, user: User) {

        return await response.jwtSign({ role: user.role }, { sign: { sub: user.id } });
    }

    private async makeRefreshToken(response: FastifyReply, user: User) {

        return await response.jwtSign({ role: user.role }, { sign: { sub: user.id, expiresIn: "7d" } });
    }

    private makeRefreshTokenCookie = async (refreshToken: string, response: FastifyReply) => {

        return response.setCookie("refreshToken", refreshToken, {
            path: "/",
            secure: true,
            sameSite: true,
            httpOnly: true
        });
    };
}
