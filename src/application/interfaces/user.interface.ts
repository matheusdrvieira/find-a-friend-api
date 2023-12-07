import { UserRoleEnum, UserTypeEnum } from "../enum/user.enum";

export interface User {
    id?: string;
    name: string;
    password: string;
    email: string;
    type: UserTypeEnum;
    role: UserRoleEnum;
    createdAt?: Date;
}
