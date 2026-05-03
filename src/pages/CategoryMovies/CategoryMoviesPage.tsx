import { useNavigate, useParams, useSearchParams } from "react-router";
import { movieCategories } from "../../common/constants";
import { MovieCard } from "../../common/components/MovieCard/MovieCard";
import { Pagination } from "../../common/components/Pagination/Pagination";
import { useGetMoviesByCategoryQuery } from "../../store/tmdbApi";
import s from "./CategoryMoviesPage.module.css";
import { MovieCategoryTabs } from "./MovieCategoryTabs/MovieCategoryTabs";
import { useEffect } from "react";
import { CategoryMoviesPageSkeleton } from "./CategoryMoviesSkeleton/CategoryMoviesPageSkeleton";
import { ErrorState } from "../../common/components/ErrorState/ErrorState";

const categoryTitles: Record<string, string> = Object.fromEntries(
  movieCategories.map((c) => [c.key, c.label]),
);

export const CategoryMoviesPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const current = category ?? "popular";

  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get("page")) || 1;

  const { data, isLoading, error, refetch } = useGetMoviesByCategoryQuery({
    category: current,
    page,
  });

  const changePage = (newPage: number) => {
    setSearchParams({
      page: String(newPage),
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

  if (isLoading) {
    return <CategoryMoviesPageSkeleton />;
  }

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
      <MovieCategoryTabs
        current={current}
        onChange={(cat) => {
          navigate(`/movies/${cat}?page=1`);
        }}
      />

      <h2>{categoryTitles[current] ?? "Movies"}</h2>

      <div className={s.grid}>
        {data?.results.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {data && (
        <Pagination
          currentPage={page}
          totalPages={Math.min(data.total_pages, 500)}
          onChange={changePage}
        />
      )}
    </div>
  );
};
