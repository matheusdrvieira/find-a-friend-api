import { UserRoleEnum } from "@/application/enum/user.enum";
import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/jwt-verify";
import { verifyUserRole } from "../../middlewares/verify-user-role";
import { PetTypeController } from "../controllers/pet-type.controller";

const petTypeController = new PetTypeController();

export async function petTypeRoutes(app: FastifyInstance) {
    app.post("/type", { onRequest: [verifyJwt, verifyUserRole(UserRoleEnum.ADMIN)] }, petTypeController.create);
}
