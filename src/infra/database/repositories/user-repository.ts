import { User } from "@/application/interfaces/user.interface";

export interface UserRepository {
    create(data: User): Promise<User>;
}
