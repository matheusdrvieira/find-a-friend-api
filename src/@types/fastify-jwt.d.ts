import { UserRoleEnum } from "@/application/enum/user.enum";
import "@fastify/jwt";

declare module "@fastify/jwt" {
    export interface FastifyJWT {
        user: {
            sub: string;
            role: UserRoleEnum;
        }
    }
}
