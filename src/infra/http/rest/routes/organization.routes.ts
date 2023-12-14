import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/jwt-verify";
import { CreateOrganizationController } from "../controllers/organization/create-organization.controller";

const createOrganizationController = new CreateOrganizationController();

export async function organizationRoutes(app: FastifyInstance) {
    app.post("/", { onRequest: [verifyJwt] }, createOrganizationController.create);
}
