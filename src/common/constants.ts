export const movieCategories = [
  { key: "popular", label: "Popular Movies" },
  { key: "top_rated", label: "Top Rated Movies" },
  { key: "upcoming", label: "Upcoming Movies" },
  { key: "now_playing", label: "Now Playing Movies" },
] as const;

export const movieGenres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
] as const;

export const SORT_OPTIONS = [
  { label: "Popularity ↓", value: "popularity.desc" },
  { label: "Popularity ↑", value: "popularity.asc" },

  { label: "Rating ↓", value: "vote_average.desc" },
  { label: "Rating ↑", value: "vote_average.asc" },

  { label: "Release date ↓", value: "primary_release_date.desc" },
  { label: "Release date ↑", value: "primary_release_date.asc" },

  { label: "Title A-Z", value: "title.asc" },
  { label: "Title Z-A", value: "title.desc" },
] as const;