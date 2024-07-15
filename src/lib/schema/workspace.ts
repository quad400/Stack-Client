import { z } from "zod";

export const workspaceFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be greater than 3 letters" }),
  description: z.string(),
  imageUrl: z.string(),
});

export const boardFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be greater than 3 letters" }),
  imageUrl: z.string(),
});
