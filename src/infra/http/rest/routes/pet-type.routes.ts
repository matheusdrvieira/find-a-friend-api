import { UserRoleEnum } from "@/application/enum/user.enum";
import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/jwt-verify";
import { verifyUserRole } from "../../middlewares/verify-user-role";
import { CreatePetTypeController } from "../controllers/pet-type/create-pet-type.controller";

const createPetTypeController = new CreatePetTypeController();

export async function petTypeRoutes(app: FastifyInstance) {
    app.post("/type", { onRequest: [verifyJwt, verifyUserRole(UserRoleEnum.ADMIN)] }, createPetTypeController.create);
}
