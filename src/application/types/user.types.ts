import { UserTypeEnum } from "../enum/user.enum";

export type CreateUserUseCaseRequest = {
    name: string;
    email: string;
    password: string;
    type: UserTypeEnum;
}
