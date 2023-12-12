import { PrismaUserRepository } from "@/infra/database/prisma/repositories/prisma-user-repository";
import { CreateSessionUseCase } from "../use-cases/session/create-session.use-case";

export function makeCreateSessionUseCase() {
    const prismaUserRepository = new PrismaUserRepository();
    const createUserUseCase = new CreateSessionUseCase(prismaUserRepository);

    return createUserUseCase;
}
