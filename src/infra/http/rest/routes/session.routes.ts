import { FastifyInstance } from "fastify";
import { SessionController } from "../controllers/session/create-session.controller";

const sessionController = new SessionController();

export async function sessionRoutes(app: FastifyInstance) {
    app.post("/", sessionController.create);
}
