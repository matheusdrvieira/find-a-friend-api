import { User } from "@/application/interfaces/user.interface";
import { randomUUID } from "crypto";
import { UserRepository } from "../repositories/user-repository";

export class UserInMemory implements UserRepository {
    public USER: User[] = [];

    async create(data: User): Promise<User> {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            type: data.type,
            created_at: new Date(),
        };

        this.USER.push(user);

        return user;
    }
}
