import { z } from "zod";
import { NullableStringSchema, DatesSchema } from "./common.schemas";

export const MovieCardSchema = z.object({
  adult: z.boolean(),
  backdrop_path: NullableStringSchema,
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: NullableStringSchema,
  release_date: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const MoviesListResponseSchema = z.object({
  page: z.number(),
  results: z.array(MovieCardSchema),
  total_pages: z.number(),
  total_results: z.number(),
});

export const UpcomingMoviesResponseSchema = MoviesListResponseSchema.extend({
  dates: DatesSchema,
});

export const NowPlayingMoviesResponseSchema = MoviesListResponseSchema.extend({
  dates: DatesSchema,
});
