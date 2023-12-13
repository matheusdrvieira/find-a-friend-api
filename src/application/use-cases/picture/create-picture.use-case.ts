import { CreatePictureUseCaseRequest } from "@/application/types/picture.type";
import { PictureRepository } from "@/infra/database/repositories/picture-repository";
import { CreatePictureException } from "./errors/picture-already-exists-error";

export class CreatePictureUseCase {
    constructor(private pictureRepository: PictureRepository) { }

    public execute = async (body: CreatePictureUseCaseRequest) => {
        try {
            const { pictures, petId } = body;

            for (const picture of pictures) {
                await this.pictureRepository.create({
                    petId,
                    picture: picture,
                });
            }

        } catch (err) {

            throw new CreatePictureException((err as Error).message);
        }
    };
}
