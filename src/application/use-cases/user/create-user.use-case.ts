import { UserRoleEnum, UserTypeEnum } from "@/application/enum/user.enum";
import { CreateUserUseCaseRequest, CreateUserUseCaseResponse } from "@/application/types/user.type";
import { UserRepository } from "@/infra/database/repositories/user-repository";
import { passwordHash } from "@/utils/password-hash.utils";
import { isUniqueKeyContraintException } from "@/utils/prisma-errors";
import { CreateUserEmailException } from "./errors/email-already-exists-error";
import { CreateUserException } from "./errors/user-already-exists-error";

export class CreateUserUseCase {
    constructor(private usersRepository: UserRepository) { }

    public execute = async (body: CreateUserUseCaseRequest): Promise<CreateUserUseCaseResponse> => {
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
            if (isUniqueKeyContraintException(err)) {
                throw new CreateUserEmailException(email);
            }

            throw new CreateUserException((err as Error).message);
        }
    };

    private makeUserType = (type: UserTypeEnum) => {
        return type == UserTypeEnum.ADOPTER ? UserTypeEnum.ADOPTER : UserTypeEnum.ORGANIZATION;
    };
}
