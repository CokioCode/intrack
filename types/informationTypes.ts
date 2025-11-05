import { z } from "zod";

export const InformationSchema = z
  .object({
    title: z.string().min(1, "Title wajib diisi"),
    description: z.string().min(1, "Description wajib diisi"),
    type: z
      .enum(["FILE", "TEXT"])
      .refine((value) => value === "FILE" || value === "TEXT", {
        message: "Type harus FILE atau TEXT",
      }),
    category: z
      .enum(["PROMO", "PAKET", "INFO"])
      .refine(
        (value) => value === "PROMO" || value === "PAKET" || value === "INFO",
        {
          message: "Category harus PROMO, PAKET, atau INFO",
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
        message: "File wajib diupload jika type FILE",
      });
    }

    if (data.category === "PROMO") {
      if (!data.start_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["start_date"],
          message: "Start date wajib diisi untuk PROMO",
        });
      }
      if (!data.end_date) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ["end_date"],
          message: "End date wajib diisi untuk PROMO",
        });
      }

      if (data.start_date && data.end_date) {
        const startDate = new Date(data.start_date);
        const endDate = new Date(data.end_date);

        if (endDate <= startDate) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            path: ["end_date"],
            message: "End date harus lebih besar dari start date",
          });
        }
      }
    }
  });

export type InformationTypes = z.infer<typeof InformationSchema>;
