import { z } from "zod";

const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const MovieGenresResponseSchema = z.object({
  genres: z.array(GenreSchema),
});