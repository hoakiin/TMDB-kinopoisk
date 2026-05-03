import { useGetSimilarMovieQuery } from "../../../store/tmdbApi";
import type { MovieCard as Movie } from "../../../store/tmdbApi.types";
import { MovieCard } from "../../../common/components/MovieCard/MovieCard";
import s from "./SimilarMovies.module.css";

type Props = {
  movieId: number;
};

export const SimilarMovies = ({ movieId }: Props) => {
  const { data } = useGetSimilarMovieQuery(movieId);

  const movies = data?.results.slice(0, 6) ?? [];

  if (movies.length === 0) return null;

  return (
    <div className={s.similar}>
      <h3>Similar Movies</h3>
      <div className={s.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie as Movie} />
        ))}
      </div>
    </div>
  );
};
