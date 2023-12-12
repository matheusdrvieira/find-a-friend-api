import { User } from "../interfaces/user.interface";

export type CreateSessionUseCaseRequest = {
    email: string;
    password: string;
}

export type CreateSessionUseCaseResponse = {
    user: User;
}
