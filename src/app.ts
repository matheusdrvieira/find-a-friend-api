import { env } from "@/config/env";
import fastify from "fastify";
import { ZodError } from "zod";
import { appRoutes } from "./infra/http/rest/routes/index.routes";

export const app = fastify();

app.register(appRoutes);

app.setErrorHandler((error, _, response) => {
    if (error instanceof ZodError) {
        return response
            .status(400)
            .send({ message: "Validation Error!", issues: error.format() });
    }

    if (env.NODE_ENV !== "production") {
        console.error(error);
    }

    return response.status(500).send({ message: "Internal Server Error!" });
});