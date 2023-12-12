import { CreateSessionUseCaseRequest, CreateSessionUseCaseResponse } from "@/application/types/session.type";
import { UserRepository } from "@/infra/database/repositories/user-repository";
import { compare } from "bcryptjs";
import { SessionCredentialsException } from "./errors/invalid-credentials-error";
import { CreateSessionException } from "./errors/session-already-exists-error";

export class CreateSessionUseCase {
    constructor(private userRepository: UserRepository) { }

    public execute = async (body: CreateSessionUseCaseRequest): Promise<CreateSessionUseCaseResponse> => {
        try {
            const { email, password } = body;

            const user = await this.userRepository.findByEmail(email);

            if (!user) throw new SessionCredentialsException("Credentials invalid");

            const doesPasswordMatches = await compare(password, user.password);

            if (!doesPasswordMatches) throw new SessionCredentialsException("Credentials invalid");

            return { user };

        } catch (err) {
            if (err instanceof SessionCredentialsException) {
                throw new SessionCredentialsException((err as Error).message);
            }

            throw new CreateSessionException((err as Error).message);
        }
    };
}
