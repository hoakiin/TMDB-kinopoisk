import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { handleErrors, withZodCatch } from "../common/utils";
import {
  MovieCreditsSchema,
  MovieDetailsSchema,
  MovieGenresResponseSchema,
  MoviesListResponseSchema,
  SimilarMoviesResponseSchema,
} from "./tmdb.schemas";
import type {
  MovieCredits,
  MovieDetails,
  MovieGenresResponse,
  MoviesFilters,
  MoviesListResponse,
  SimilarMoviesResponse,
} from "./tmdbApi.types";
import { withApiKey } from "./withApiKey";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
    })(args, api, extraOptions);

    if (result.error) {
      handleErrors(result.error)
    }

    return result
  },

  endpoints: (builder) => ({
    getMoviesByCategory: builder.query<
      MoviesListResponse,
      {
        category: string;
        page: number;
      }
    >({
      query: ({ category, page }) => ({
        url: `/movie/${category}`,
        params: withApiKey({
          page,
        }),
      }),

      transformResponse: withZodCatch(MoviesListResponseSchema),
    }),

    searchMovies: builder.query<
      MoviesListResponse,
      {
        query: string;
        page: number;
      }
    >({
      query: ({ query, page }) => ({
        url: `/search/movie`,
        params: withApiKey({
          query,
          page,
          include_adult: false,
        }),
      }),

      transformResponse: withZodCatch(MoviesListResponseSchema),
    }),

    getMovieDetailsById: builder.query<MovieDetails, number>({
      query: (id) => ({
        url: `/movie/${id}`,
        params: withApiKey(),
      }),

      transformResponse: withZodCatch(MovieDetailsSchema),
    }),

    getMovieCredits: builder.query<MovieCredits, number>({
      query: (id) => ({
        url: `/movie/${id}/credits`,
        params: withApiKey(),
      }),

      transformResponse: withZodCatch(MovieCreditsSchema),
    }),

    getSimilarMovie: builder.query<SimilarMoviesResponse, number>({
      query: (id) => ({
        url: `/movie/${id}/similar`,
        params: withApiKey(),
      }),

      transformResponse: withZodCatch(SimilarMoviesResponseSchema),
    }),

    getMovieGenres: builder.query<MovieGenresResponse, void>({
      query: () => ({
        url: `/genre/movie/list`,
        params: withApiKey(),
      }),

      transformResponse: withZodCatch(MovieGenresResponseSchema),
    }),

    getMoviesByFilters: builder.query<MoviesListResponse, MoviesFilters>({
      query: (params) => ({
        url: "/discover/movie",
        params: withApiKey(params),
      }),

      transformResponse: withZodCatch(MoviesListResponseSchema),
    }),
  }),
});

export const {
  useGetMoviesByCategoryQuery,
  useSearchMoviesQuery,
  useGetMovieDetailsByIdQuery,
  useGetMovieCreditsQuery,
  useGetSimilarMovieQuery,
  useGetMovieGenresQuery,
  useGetMoviesByFiltersQuery,
} = tmdbApi;
