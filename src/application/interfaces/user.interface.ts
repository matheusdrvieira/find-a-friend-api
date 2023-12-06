import { UserRoleEnum, UserTypeEnum } from "../enum/user.enum";

export interface User {
    name: string;
    password: string;
    email: string;
    type: UserTypeEnum;
    role: UserRoleEnum;
}
