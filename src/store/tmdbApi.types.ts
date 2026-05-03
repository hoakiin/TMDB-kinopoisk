import { z } from "zod";
import {
  MovieCardSchema,
  MoviesListResponseSchema,
  MovieListParamsSchema,
  DatesSchema,
  MovieDetailsSchema,
  MovieCreditsSchema,
  CastSchema,
  SimilarMovieSchema,
  SimilarMoviesResponseSchema,
  GenreSchema,
  MovieGenresResponseSchema,
} from "./tmdb.schemas";

/* PARAMS */

export type MovieListParams = z.infer<typeof MovieListParamsSchema>;

/* MODELS */

export type MovieCard = z.infer<typeof MovieCardSchema>;

export type Dates = z.infer<typeof DatesSchema>;

/* UNIFIED RESPONSE */

export type MoviesListResponse = z.infer<typeof MoviesListResponseSchema>;

/* MOVIE DETAILS */

export type MovieDetails = z.infer<typeof MovieDetailsSchema>;

export type MovieCredits = z.infer<typeof MovieCreditsSchema>;
export type Cast = z.infer<typeof CastSchema>;

/* SIMILAR MOVIE */

export type SimilarMovie = z.infer<typeof SimilarMovieSchema>;
export type SimilarMoviesResponse = z.infer<typeof SimilarMoviesResponseSchema>;

/* MOVIE GENRES */

export type Genre = z.infer<typeof GenreSchema>;
export type MovieGenresResponse = z.infer<typeof MovieGenresResponseSchema>;

/* MOVIE FILTERS */

export type MoviesFilters = {
  page?: number;

  sort_by?: SortBy

  with_genres?: string; // "28,12,35"

  "vote_average.gte"?: number;
  "vote_average.lte"?: number;

  "vote_count.gte"?: number;

  primary_release_year?: number;
};

export type SortBy =
  | "popularity.desc"
  | "popularity.asc"
  | "vote_average.asc"
  | "vote_average.desc"
  | "primary_release_date.asc"
  | "primary_release_date.desc"
  | "title.asc"
  | "title.desc";