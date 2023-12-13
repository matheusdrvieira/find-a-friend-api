import { UserTypeEnum } from "../enum/user.enum";
import { User } from "../interfaces/user.interface";

export type CreateUserUseCaseRequest = {
    name: string;
    email: string;
    password: string;
    type: UserTypeEnum;
}

export type CreateUserUseCaseResponse = {
    user: User;
}
