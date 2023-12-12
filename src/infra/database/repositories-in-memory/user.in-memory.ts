import { User } from "@/application/interfaces/user.interface";
import { randomUUID } from "crypto";
import { UserRepository } from "../repositories/user-repository";

export class UserInMemory implements UserRepository {
    public USERS: User[] = [];

    async create(data: User): Promise<User> {
        const user = {
            id: randomUUID(),
            name: data.name,
            email: data.email,
            password: data.password,
            role: data.role,
            type: data.type,
            createdAt: new Date(),
        };

        this.USERS.push(user);

        return user;
    }

    async findByEmail(email: string): Promise<User | null> {
        const user = this.USERS.find((user) => user.email == email);

        if (!user) return null;

        return user;
    }
}
