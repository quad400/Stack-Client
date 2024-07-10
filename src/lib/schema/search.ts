import { z } from "zod";


export const searchFormSchema = z.object({
    search: z.string()
})