import { Picture } from "@/application/interfaces/picture.interface";
import { prisma } from "@/infra/database/lib/prisma";
import { PictureRepository } from "../../repositories/picture-repository";
import { convertToDomain, convertToPrisma } from "../mappers/picture.mappers";

export class PrismaPictureRepository implements PictureRepository {
    async create(data: Picture): Promise<Picture> {
        const picture = await prisma.picture.create({
            data: convertToPrisma(data),
        });

        return convertToDomain(picture);
    }
}
