import { makeCreateUserUseCase } from "@/application/factories/make-create-user.use-case";
import { CreateUserEmailException } from "@/application/use-cases/user/errors/email-already-exists-error";
import { CreateUserException } from "@/application/use-cases/user/errors/user-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";
import { FastifyRequestType } from "fastify/types/type-provider";
import { UserZodValidator } from "../validator/zod/user/user.validator";

export class UserController {
    public create = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const userValidate = await this.validateUser(request.body);

            const createUseCase = makeCreateUserUseCase();
            const { user } = await createUseCase.execute(userValidate);

            this.makeUserCookie(user.id!, response);

            return response.status(201).send({ message: "User Created Successfully!" });

        } catch (err) {
            if (err instanceof CreateUserEmailException) {
                return response.status(409).send(err.messageException());
            }

            if (err instanceof CreateUserException) {
                return response.status(400).send(err);
            }

            throw err;
        }
    };

    private validateUser = async (body: FastifyRequestType["body"]) => {
        const validationSchema = new UserZodValidator();
        return await validationSchema.userBodyValidator(body);
    };

    private makeUserCookie = async (userId: string, response: FastifyReply) => {
        return response.cookie("user_id", userId, {
            path: "/",
            maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
        });
    };
}
