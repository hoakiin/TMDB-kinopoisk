import { MovieCard } from "../../../common/components/MovieCard/MovieCard";
import { useGetMoviesByCategoryQuery } from "../../../store/tmdbApi";
import s from "./MovieSection.module.css";
import { MovieSectionSkeleton } from "./MovieSkeleton/MovieSectionSkeleton";

type MovieSectionProps = {
  category: string;
  label: string;
  onViewMore: (path: string) => void;
};

export const MovieSection = ({
  category,
  label,
  onViewMore,
}: MovieSectionProps) => {
  const { data, isLoading} = useGetMoviesByCategoryQuery({
    category,
    page: 1,
  });

  const movies = data?.results.slice(0, 6) ?? [];

  if (isLoading) {
    return <MovieSectionSkeleton />;
  }

  return (
    <section className={s.section}>
      <div className={s.sectionHeader}>
        <h2>{label}</h2>
        <button
          className={s.viewMoreBtn}
          onClick={() => onViewMore(`/movies/${category}?page=1`)}
        >
          View more
        </button>
      </div>

      <div className={s.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};
