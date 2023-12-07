import { UserRoleEnum, UserTypeEnum } from "@/application/enum/user.enum";
import { CreateUserUseCaseRequest, CreateUserUseCaseResponse } from "@/application/types/user.types";
import { UserRepository } from "@/infra/database/repositories/user-repository";
import { passwordHash } from "@/utils/password-hash.utils";
import { isUniqueKeyContraint } from "@/utils/prisma-errors";
import { CreateUserEmailException } from "./errors/email-already-exists-error";
import { CreateUserException } from "./errors/user-already-exists-error";

export class CreateUserUseCase {
    constructor(private usersRepository: UserRepository) { }

    async execute(body: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> {
        const { name, email, password, type } = body;

        try {
            const userPassword = await passwordHash(password);
            const userType = this.makeUserType(type);

            const user = await this.usersRepository.create({
                name,
                email,
                password: userPassword,
                type: userType,
                role: UserRoleEnum.BASIC,
            });

            return { user };

        } catch (err) {
            if (isUniqueKeyContraint(err)) {
                throw new CreateUserEmailException(email);
            }

            throw new CreateUserException((err as Error).message);
        }
    }

    private makeUserType(type: UserTypeEnum) {
        return type == UserTypeEnum.ADOPTER ? UserTypeEnum.ADOPTER : UserTypeEnum.ORGANIZATION;
    }
}
