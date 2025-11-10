import { z } from "zod";

export const keywordSchema = z.object({
  keywords: z.array(z.string()).min(1, "Please add at least one keyword"),
  response: z.string().min(1, "Response is required"),
});

export type KeywordTypes = z.infer<typeof keywordSchema>;
