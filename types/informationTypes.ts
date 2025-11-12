import { z } from "zod";

export const InformationSchema = z
  .object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(10, "Description must be at least 10 characters"),
    type: z
      .enum(["FILE", "TEXT"])
      .refine((value) => value === "FILE" || value === "TEXT", {
        message: "Type must be either FILE or TEXT",
      }),
    category: z
      .enum(["PROMO", "PAKET", "INFO"])
      .refine(
        (value) => value === "PROMO" || value === "PAKET" || value === "INFO",
        {
          message: "Category must be PROMO, PACKAGE, or INFO",
        }
      ),
    file: z.any().nullable(),
    keywords: z
      .array(z.string())
      .or(
        z.string().transform((val) => {
          try {
            return JSON.parse(val);
          } catch {
            return [];
          }
        })
      )
      .optional(),
    start_date: z.string().nullable(),
    end_date: z.string().nullable(),
  })
  .superRefine((data, ctx) => {
    if (data.type === "FILE" && !data.file) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["file"],
        message: "File is required when type is FILE",
      });
    }

    if (data.category === "PROMO") {
      if (!data.start_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["start_date"],
          message: "Start date is required for PROMO",
        });
      }
      if (!data.end_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["end_date"],
          message: "End date is required for PROMO",
        });
      }

      if (data.start_date && data.end_date) {
        const startDate = new Date(data.start_date);
        const endDate = new Date(data.end_date);

        if (endDate <= startDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["end_date"],
            message: "End date must be after start date",
          });
        }
      }
    }
  });

export type InformationTypes = z.infer<typeof InformationSchema>;
