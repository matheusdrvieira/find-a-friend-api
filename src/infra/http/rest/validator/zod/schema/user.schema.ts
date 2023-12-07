import { UserTypeEnum } from "@/application/enum/user.enum";
import { z } from "zod";

const userTypeEnumValues = Object.values(UserTypeEnum) as [UserTypeEnum];

export const createUserBodySchema = z.object({
    email: z.string().email(),
    name: z.string().min(3),
    password: z.string(),
    type: z.enum(userTypeEnumValues),
});
