import { CreateRefreshTokenException } from "@/application/use-cases/session/errors/refresh-token-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class RefreshTokenController {
    public create = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            await request.jwtVerify({ onlyCookie: true });

            const token = await this.makeJwtToken(request, response);
            const refreshToken = await this.makeJwtRefreshToken(request, response);

            this.makeRefreshTokenCookie(refreshToken, response);

            return response.status(200).send({ message: "Refresh Token Created Successfully!", token });

        } catch (err) {

            throw new CreateRefreshTokenException((err as Error).message);
        }
    };

    private async makeJwtRefreshToken(request: FastifyRequest, response: FastifyReply) {

        return await response.jwtSign({ role: request.user.role }, { sign: { sub: request.user.sub, expiresIn: "7d" } });
    }

    private async makeJwtToken(request: FastifyRequest, response: FastifyReply) {

        return await response.jwtSign({ role: request.user.role }, { sign: { sub: request.user.sub } });
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
