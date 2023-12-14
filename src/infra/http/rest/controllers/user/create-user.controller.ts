import { createUserValidate } from "@/application/factories-zod/user/validate-zod";
import { makeCreateUserUseCase } from "@/application/factories/user/make-create-user.use-case";
import { CreateUserEmailException } from "@/application/use-cases/user/errors/email-already-exists-error";
import { CreateUserException } from "@/application/use-cases/user/errors/user-already-exists-error";
import { FastifyReply, FastifyRequest } from "fastify";

export class CreateUserController {
    public create = async (request: FastifyRequest, response: FastifyReply) => {
        try {
            const userValidate = await createUserValidate(request.body);

            const createUserUseCase = makeCreateUserUseCase();
            await createUserUseCase.execute(userValidate);

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
}
