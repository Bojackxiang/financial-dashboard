import { z } from "zod";

export const accountSchema = z.object({
  name: z.string(),
  plaidId: z.string(),
  userId: z.string(),
});
