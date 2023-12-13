import { FastifyInstance } from "fastify";
import { RefreshTokenController } from "../controllers/refresh-token.controller";

const refreshTokenController = new RefreshTokenController();

export async function refreshTokenRoutes(app: FastifyInstance) {
    app.patch("/token", refreshTokenController.create);
}
