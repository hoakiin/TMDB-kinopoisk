import { useState } from "react";
import { useSearchParams } from "react-router";
import { useDebounceValue } from "../../common/hooks";
import { useGetMoviesByFiltersQuery } from "../../store/tmdbApi";
import type { SortBy } from "../../store/tmdbApi.types";
import { FilterPanel } from "./FilterPanel/FilterPanel";
import { FilteredMoviesList } from "./FilteredMoviesList/FilteredMoviesList";
import { useEffect } from "react";
import s from "./FilteredMoviesPage.module.css";
import { ErrorState } from "../../common/components/ErrorState/ErrorState";

export const FilteredMoviesPage = () => {
  const [sortBy, setSortBy] = useState<SortBy>("popularity.desc");
  const [ratingMin, setRatingMin] = useState(0);
  const [ratingMax, setRatingMax] = useState(10);
  const debouncedRatingMin = useDebounceValue(ratingMin, 200);
  const debouncedRatingMax = useDebounceValue(ratingMax, 200);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error, refetch } = useGetMoviesByFiltersQuery({
    sort_by: sortBy,
    "vote_average.gte": debouncedRatingMin,
    "vote_average.lte": debouncedRatingMax,
    with_genres: selectedGenres.join(","),
    page,
  });

  const toggleGenre = (id: number) => {
    setSelectedGenres((prev) =>
      prev.includes(id) ? prev.filter((g) => g !== id) : [...prev, id],
    );
  };

  const resetFilters = () => {
    setSortBy("popularity.desc");
    setRatingMin(0);
    setRatingMax(10);
    setSelectedGenres([]);
    setSearchParams({});
  };

  const changePage = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  useEffect(() => {
    if (!isLoading && data) {
      const id = requestAnimationFrame(() => {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      });

      return () => cancelAnimationFrame(id);
    }
  }, [page, isLoading, data]);

  if (error)
    return (
      <ErrorState
        title="Failed to load"
        message="Check your internet connection or try again."
        onRetry={refetch}
      />
    );

  return (
    <div className={s.layout}>
      <aside className={s.sidebar}>
        <FilterPanel
          sortBy={sortBy}
          onSortChange={setSortBy}
          ratingMin={ratingMin}
          ratingMax={ratingMax}
          onRatingMinChange={setRatingMin}
          onRatingMaxChange={setRatingMax}
          selectedGenres={selectedGenres}
          onToggleGenre={toggleGenre}
          onReset={resetFilters}
        />
      </aside>

      <main className={s.content}>
        <FilteredMoviesList
          data={data}
          isLoading={isLoading}
          currentPage={page}
          onPageChange={changePage}
        />
      </main>
    </div>
  );
};
