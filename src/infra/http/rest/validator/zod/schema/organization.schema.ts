import { z } from "zod";
import { createAddressBodySchema } from "./address.schema";

export const createOrganizationBodySchema = z.object({
    userId: z.string().uuid(),
    name: z.string().min(1),
    phone: z.string(),
    address: createAddressBodySchema
});
