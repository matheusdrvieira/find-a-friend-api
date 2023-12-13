import { UserRoleEnum } from "@/application/enum/user.enum";
import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/jwt-verify";
import { verifyUserRole } from "../../middlewares/verify-user-role";
import { PetController } from "../controllers/pet.controller";

const petController = new PetController();

export async function petRoutes(app: FastifyInstance) {
    app.post("/", { onRequest: [verifyJwt, verifyUserRole(UserRoleEnum.ADMIN)] }, petController.create);
}
