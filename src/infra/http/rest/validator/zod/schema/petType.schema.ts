import { z } from "zod";

export const createPetTypeBodySchema = z.object({
    name: z.string().min(1),
});
