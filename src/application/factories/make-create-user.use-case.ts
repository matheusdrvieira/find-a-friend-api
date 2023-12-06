import { PrismaUserRepository } from "@/infra/database/prisma/repositories/prisma-user-repository";
import { CreateUserUseCase } from "../use-cases/user/create-user.use-case";

export function makeCreateUserUseCase() {
    const prismaUserRepository = new PrismaUserRepository();
    const createUserUseCase = new CreateUserUseCase(prismaUserRepository);

    return createUserUseCase;
}
