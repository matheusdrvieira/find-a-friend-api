import { FastifyRequestType } from "fastify/types/type-provider";
import { createUserBodySchema } from "../schema/user.schema";
import { UserValidator } from "./user.validator.abstract";

export class UserZodValidator implements UserValidator {
    async userBodyValidator(body: FastifyRequestType["body"]) {

        return createUserBodySchema.parse(body);
    }
}
