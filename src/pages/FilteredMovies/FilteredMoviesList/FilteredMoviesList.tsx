import { Pagination } from "../../../common/components/Pagination/Pagination";
import { MovieCard } from "../../../common/components/MovieCard/MovieCard";
import type { MoviesListResponse } from "../../../store/tmdbApi.types";
import s from "./FilteredMoviesList.module.css";
import { FilteredMoviesListSkeleton } from "./FilteredMoviesSkeleton/FilteredMoviesListSkeleton";

type Props = {
  data: MoviesListResponse | undefined;
  isLoading: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
};

export const FilteredMoviesList = ({
  data,
  isLoading,
  currentPage,
  onPageChange,
}: Props) => {
  if (isLoading) return <FilteredMoviesListSkeleton/>;

  if (!data?.results.length) return <p>No movies found</p>;

  return (
    <>
      <div className={s.grid}>
        {data.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={Math.min(data.total_pages, 500)}
        onChange={onPageChange}
      />
    </>
  );
};
