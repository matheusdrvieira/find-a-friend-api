import { FastifyInstance } from "fastify";
import { organizationRoutes } from "./organization.routes";
import { petRoutes } from "./pet.routes";
import { petTypeRoutes } from "./petType.routes";
import { refreshTokenRoutes } from "./refresh-token.routes";
import { sessionRoutes } from "./session.routes";
import { userRoutes } from "./user.routes";

export async function appRoutes(app: FastifyInstance) {
    app.register(userRoutes, { prefix: "users" });
    app.register(sessionRoutes, { prefix: "sessions" });
    app.register(organizationRoutes, { prefix: "organizations" });
    app.register(refreshTokenRoutes, { prefix: "refresh" });
    app.register(petRoutes, { prefix: "pets" });
    app.register(petTypeRoutes, { prefix: "pet" });
}
