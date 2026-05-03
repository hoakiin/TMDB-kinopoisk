import { z } from "zod";

export const NullableStringSchema = z.string().nullable();

export const MovieListParamsSchema = z.object({
  language: z.string().optional(),
  page: z.number().int().positive().optional(),
  region: z.string().length(2).optional(),
});

export const DatesSchema = z.object({
  maximum: z.string(),
  minimum: z.string(),
});
