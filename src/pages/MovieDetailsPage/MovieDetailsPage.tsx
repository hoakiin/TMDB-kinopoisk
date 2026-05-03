import { useEffect } from "react";
import { useParams } from "react-router";
import { useGetMovieDetailsByIdQuery } from "../../store/tmdbApi";
import { MovieCast } from "./MovieCast/MovieCast";
import { MovieInfo } from "./MovieInfo/MovieInfo";
import { SimilarMovies } from "./SimilarMovies/SimilarMovies";

export const MovieDetailsPage = () => {
  const { id } = useParams();

  const movieId = Number(id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [movieId]);

  const { data, isLoading } = useGetMovieDetailsByIdQuery(movieId, {
    skip: !movieId,
  });

  if (isLoading) return <div>Loading...</div>;
  if (!data) return <div>No data found</div>;

  return (
    <div>
       <MovieInfo movie={data} />
       <MovieCast movieId={movieId}/>
       <SimilarMovies movieId={movieId}/>
    </div>
  ) 
};