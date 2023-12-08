import { FastifyInstance } from "fastify";
import { OrganizationController } from "../controllers/organization.controller";

const organizationController = new OrganizationController();

export async function organizationRoutes(app: FastifyInstance) {
    app.post("/", organizationController.create);
}
