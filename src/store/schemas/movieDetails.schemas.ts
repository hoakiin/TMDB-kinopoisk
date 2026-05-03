import { z } from "zod";

export const GenreSchema = z.object({
  id: z.number(),
  name: z.string(),
});

export const ProductionCompanySchema = z.object({
  id: z.number(),
  logo_path: z.string().nullable(),
  name: z.string(),
  origin_country: z.string(),
});

export const ProductionCountrySchema = z.object({
  iso_3166_1: z.string(),
  name: z.string(),
});

export const SpokenLanguageSchema = z.object({
  english_name: z.string(),
  iso_639_1: z.string(),
  name: z.string(),
});

export const BelongsToCollectionSchema = z.object({
  id: z.number(),
  name: z.string(),
  poster_path: z.string().nullable(),
  backdrop_path: z.string().nullable(),
});

export const MovieDetailsSchema = z.object({
  adult: z.boolean(),
  backdrop_path: z.string().nullable(),

  belongs_to_collection: BelongsToCollectionSchema.nullable(),

  budget: z.number(),
  genres: z.array(GenreSchema),

  homepage: z.string().nullable(),

  id: z.number(),
  imdb_id: z.string().nullable(),

  origin_country: z.array(z.string()),

  original_language: z.string(),
  original_title: z.string(),
  overview: z.string(),

  popularity: z.number(),

  poster_path: z.string().nullable(),

  production_companies: z.array(ProductionCompanySchema),
  production_countries: z.array(ProductionCountrySchema),

  release_date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format")
    .or(z.literal("")),

  revenue: z.number(),
  runtime: z.number().nullable(),

  spoken_languages: z.array(SpokenLanguageSchema),

  status: z.enum([
    "Rumored",
    "Planned",
    "In Production",
    "Post Production",
    "Released",
    "Canceled",
  ]),

  tagline: z.string().nullable(),
  title: z.string(),

  video: z.boolean(),
  vote_average: z.number(),
  vote_count: z.number(),
});
