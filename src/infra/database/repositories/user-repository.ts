import { User } from "@/application/interfaces/user.interface";

export interface UserRepository {
    findByEmail(email: string): Promise<User | null>
    create(data: User): Promise<User>;
}
