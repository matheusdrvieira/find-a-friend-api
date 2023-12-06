import { UserRoleEnum, UserTypeEnum } from "@/application/enum/user.enum";
import { User } from "@/application/interfaces/user.interface";
import { Prisma, User as UserPrisma, UserRole, UserType } from "@prisma/client";

export function convertToPrisma(data: User): Prisma.UserCreateInput {
    const userPrisma: Prisma.UserCreateInput = {
        name: data.name,
        email: data.email,
        password: data.password,
        type: UserTypeEnum[data.type] as UserType,
        role: UserRoleEnum[data.role] as UserRole,
    };

    return userPrisma;
}

export function convertToDomain(data: UserPrisma): User {
    const user: User = {
        name: data.name,
        email: data.email,
        password: data.password,
        type: UserTypeEnum[data.type],
        role: UserRoleEnum[data.role],
    };

    return user;
}
