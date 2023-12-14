import { PrismaPictureRepository } from "@/infra/database/prisma/repositories/prisma-picture-repository";
import { CreatePictureUseCase } from "../../use-cases/picture/create-picture.use-case";

export function makeCreatePictureUseCase() {
    const prismaPictureRepository = new PrismaPictureRepository();
    const createPictureUseCase = new CreatePictureUseCase(prismaPictureRepository);

    return createPictureUseCase;
}
