import { Picture } from "@/application/interfaces/picture.interface";
import { randomUUID } from "crypto";
import { PictureRepository } from "../repositories/picture-repository";

export class PictureInMemory implements PictureRepository {
    public PICTURES: Picture[] = [];

    async create(data: Picture): Promise<any> { //eslint-disable-line
        for (const picture of data.picture) {
            const pictur = {
                id: randomUUID(),
                petId: data.petId,
                picture: picture,
                createdAt: new Date()
            };

            this.PICTURES.push(pictur);
        }

        return this.PICTURES;
    }
}
