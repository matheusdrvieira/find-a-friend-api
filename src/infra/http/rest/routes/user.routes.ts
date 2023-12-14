import { FastifyInstance } from "fastify";
import { CreateUserController } from "../controllers/user/create-user.controller";

const createUserController = new CreateUserController();

export async function userRoutes(app: FastifyInstance) {
    app.post("/", createUserController.create);
}
