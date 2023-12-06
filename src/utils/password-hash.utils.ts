import { hash } from "bcryptjs";

export async function passwordHash(password: string) {

    return await hash(password, 8);
}   
