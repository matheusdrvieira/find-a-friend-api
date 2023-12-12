import { User } from "@/application/interfaces/user.interface";
import { prisma } from "@/infra/database/lib/prisma";
import { UserRepository } from "@/infra/database/repositories/user-repository";
import { convertToDomain, convertToPrisma } from "../mappers/user.mappers";

export class PrismaUserRepository implements UserRepository {
    async findByEmail(email: string): Promise<User | null> {
        const user = await prisma.user.findUnique({
            where: { email }
        });

        return user && convertToDomain(user);
    }

    async create(data: User): Promise<User> {
        const user = await prisma.user.create({
            data: convertToPrisma(data),
        });

        return convertToDomain(user);
    }
}
