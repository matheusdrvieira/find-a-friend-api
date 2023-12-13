import { Picture } from "@/application/interfaces/picture.interface";
import { Picture as PicturePrisma, Prisma } from "@prisma/client";

export function convertToPrisma(data: Picture): Prisma.PictureUncheckedCreateInput {
    const picturePrisma: Prisma.PictureUncheckedCreateInput = {
        petId: data.petId,
        picture: data.picture
    };

    return picturePrisma;
}

export function convertToDomain(data: PicturePrisma): Picture {
    const picture: Picture = {
        id: data.id,
        petId: data.petId,
        picture: data.picture,
        createdAt: data.createdAt
    };

    return picture;
}
