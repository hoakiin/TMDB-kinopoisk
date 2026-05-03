import { useNavigate } from "react-router";
import type { MovieCard as Movie } from "../../../store/tmdbApi.types";
import { getFavorites, saveFavorites } from "../../utils";
import { FavoriteButton } from "./FavoriteButton/FavoriteButton";
import s from "./MovieCard.module.css";

type Props = {
  movie: Movie;
};

import { useEffect, useState } from "react";
import type { FavoriteMovie } from "../../utils/favorites";

export const MovieCard = ({ movie }: Props) => {
  const navigate = useNavigate();

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : null;

  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(false);
  }, [movie.id]);

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = getFavorites();
    const exists = favorites.some((m) => m.id === movie.id);
    setIsFavorite(exists);
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = getFavorites();

    let updated;

    if (isFavorite) {
      updated = favorites.filter((m) => m.id !== movie.id);
    } else {
      const favoriteMovie: FavoriteMovie = {
        id: movie.id,
        title: movie.title,
        poster_path: movie.poster_path,
        vote_average: movie.vote_average,
      };
      updated = [...favorites, favoriteMovie];
    }

    saveFavorites(updated);
    setIsFavorite(!isFavorite);

    window.dispatchEvent(new Event("favoritesChanged"));
  };

  const onPosterClickHandler = (id: number) => {
    navigate(`/movie/${id}`)
  }

  return (
    <div onClick={() => onPosterClickHandler(movie.id)}>
      <div className={s.posterWrapper}>
        {posterUrl ? (
          <img
            loading="lazy"
            className={`${s.poster} ${isLoaded ? s.loaded : ""}`}
            src={posterUrl}
            alt={movie.title}
            onLoad={() => setIsLoaded(true)}
          />
        ) : (
          <div className={s.noPoster}>No Poster</div>
        )}

        <div className={s.rating}>⭐ {movie.vote_average.toFixed(1)}</div>

        <div
          className={`${s.favoriteWrapper} ${
            isFavorite ? s.alwaysVisible : ""
          }`}
        >
          <FavoriteButton isActive={isFavorite} onToggle={toggleFavorite} />
        </div>
      </div>

      <p className={s.title}>{movie.title}</p>
    </div>
  );
};
