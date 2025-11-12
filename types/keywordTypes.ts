import { z } from "zod";

export const keywordSchema = z.object({
  keywords: z.array(z.string()).min(1, "Please add at least one keyword"),
  response: z.string().optional().nullable(),
});

export type KeywordTypes = z.infer<typeof keywordSchema>;
