import { useNavigate } from "react-router";
import { movieCategories } from "../../common/constants";
import { useGetMoviesByCategoryQuery } from "../../store/tmdbApi";
import { MovieSection } from "./MovieSection/MovieSection";
import { WelcomeSection } from "./WelcomeSection/WelcomeSection";
import { WelcomeSectionSkeleton } from "./WelcomeSection/WelcomeSectionSkeleton/WelcomeSectionSkeleton";
import { ErrorState } from "../../common/components/ErrorState/ErrorState";

export const MainPage = () => {
  const navigate = useNavigate();

  const { data, isLoading, error, refetch } = useGetMoviesByCategoryQuery({
    category: "popular",
    page: 1,
  });

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
      {isLoading ? (
        <WelcomeSectionSkeleton />
      ) : data?.results ? (
        <WelcomeSection movies={data.results} />
      ) : null}
      {movieCategories.map(({ key, label }) => (
        <MovieSection
          key={key}
          category={key}
          label={label}
          onViewMore={navigate}
        />
      ))}
    </div>
  );
};
