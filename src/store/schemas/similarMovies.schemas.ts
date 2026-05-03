import { z } from "zod";

export const SimilarMovieSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),
  genre_ids: z.array(z.number()),
  id: z.number(),
  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),
  popularity: z.number(),
  poster_path: z.string().nullable(),
  release_date: z.string().nullable(),
  title: z.string(),
  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});

export const SimilarMoviesResponseSchema = z.object({
  page: z.number(),
  results: z.array(SimilarMovieSchema),
  total_pages: z.number(),
  total_results: z.number(),
});
