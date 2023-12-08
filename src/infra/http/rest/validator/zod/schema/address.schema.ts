import { z } from "zod";

export const createAddressBodySchema = z.object({
    postalCode: z.string().min(1),
    uf: z.string().min(1),
    country: z.string().min(1),
    city: z.string().min(1),
    province: z.string().min(1),
    neighbourhood: z.string().min(1),
    lat: z.string().min(1),
    lng: z.string().min(1)
});
