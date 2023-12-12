import { makeCreateSessionUseCase } from "@/application/factories/make-create-session.use-case";
import { User } from "@/application/interfaces/user.interface";
import { SessionCredentialsException } from "@/application/use-cases/session/errors/invalid-credentials-error";
import { CreateSessionException } from "@/application/use-cases/session/errors/session-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestType } from "fastify/types/type-provider";
import { SessionZodValidator } from "../validator/zod/session/session.validator";

export class SessionController {
    public create = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const sessionValidate = await this.validateUser(request.body);

            const createUseCase = makeCreateSessionUseCase();

            const { user } = await createUseCase.execute(sessionValidate);

            const token = await this.makeJwtToken(response, user);
            const refreshToken = await this.makeRefreshToken(response, user);

            return response
                .setCookie("refreshToken", refreshToken, {
                    path: "/",
                    secure: true,
                    sameSite: true,
                    httpOnly: true
                })
                .status(201)
                .send({ message: "Session Created Successfully!", user, token });

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

    private validateUser = async (body: FastifyRequestType["body"]) => {
        const validationSchema = new SessionZodValidator();

        return await validationSchema.sessionBodyValidator(body);
    };

    private async makeJwtToken(response: FastifyReply, user: User) {

        return await response.jwtSign({ role: user.role }, { sign: { sub: user.id } });
    }

    private async makeRefreshToken(response: FastifyReply, user: User) {

        return await response.jwtSign({ role: user.role }, { sign: { sub: user.id, expiresIn: "7d" } });
    }
}
