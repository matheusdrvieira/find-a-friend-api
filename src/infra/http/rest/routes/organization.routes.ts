import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/jwt-verify";
import { OrganizationController } from "../controllers/organization.controller";

const organizationController = new OrganizationController();

export async function organizationRoutes(app: FastifyInstance) {
    app.post("/", { onRequest: [verifyJwt] }, organizationController.create);
}
