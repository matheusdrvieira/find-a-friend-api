import { FastifyInstance } from "fastify";
import { verifyJwt } from "../../middlewares/jwt-verify";
import { CreatePetController } from "../controllers/pet/create-pet.controller";
import { FindByIdPetController } from "../controllers/pet/findById-pet.controller";
import { FindManyPetController } from "../controllers/pet/findMany-pet.controller";

const createPetController = new CreatePetController();
const findManyPetController = new FindManyPetController();
const findByIdPetController = new FindByIdPetController();

export async function petRoutes(app: FastifyInstance) {
    app.post("/", { onRequest: [verifyJwt] }, createPetController.create);
    app.get("/", findManyPetController.index);
    app.get("/:id", findByIdPetController.show);
}
