import { z } from "zod";

export const createSessionBodySchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
