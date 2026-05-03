import { useState } from "react";
import { useSearchParams } from "react-router";
import { useSearchMoviesQuery } from "../../store/tmdbApi";
import { MovieCard } from "../../common/components/MovieCard/MovieCard";
import { Pagination } from "../../common/components/Pagination/Pagination";
import { SearchForm } from "../../common/components/SearchForm/SearchForm";
import { useEffect } from "react";
import s from "./SearchPage.module.css";
import { SearchResultsSkeleton } from "./SearchPageSkeleton/SearchResultsSkeleton";
import { ErrorState } from "../../common/components/ErrorState/ErrorState";

export const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const queryFromUrl = searchParams.get("query");

  useEffect(() => {
    if (queryFromUrl) {
      setSearchQuery(queryFromUrl);
    }
  }, [queryFromUrl]);

  const { data, isLoading, error, refetch } = useSearchMoviesQuery(
    {
      query: searchQuery,
      page,
    },
    { skip: !searchQuery },
  );

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSearchParams({ page: "1", query });
  };

  const handleClear = () => {
    setSearchQuery("");
    setSearchParams({});
  };

  const changePage = (newPage: number) => {
    setSearchParams({
      page: String(newPage),
      query: searchQuery,
    });
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

  const initialMessage = !searchQuery;
  const noResults = searchQuery && data?.results.length === 0;

  if (error)
    return (
      <ErrorState
        title="Failed to load"
        message="Check your internet connection or try again."
        onRetry={refetch}
      />
    );

  return (
    <div>
      <h1>Search Results</h1>
      <SearchForm
        onSubmit={handleSearch}
        onClear={handleClear}
        initialValue={searchQuery}
      />

      {initialMessage && (
        <p className={s.message}>Enter a movie title to start searching</p>
      )}
      {searchQuery && !isLoading && data && (
        <h2 className={s.resultsFor}>Results for "{searchQuery}"</h2>
      )}
      {noResults && (
        <p className={s.message}>No matches found for "{searchQuery}"</p>
      )}

      {isLoading && <SearchResultsSkeleton />}

      {!initialMessage && !noResults && data && !isLoading && (
        <>
          <div className={s.grid}>
            {data.results.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
          <Pagination
            currentPage={page}
            totalPages={Math.min(data.total_pages, 500)}
            onChange={changePage}
          />
        </>
      )}
    </div>
  );
};
