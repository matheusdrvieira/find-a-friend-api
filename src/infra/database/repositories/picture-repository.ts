import { Picture } from "@/application/interfaces/picture.interface";

export interface PictureRepository {
    create(data: Picture): Promise<Picture>;
}
