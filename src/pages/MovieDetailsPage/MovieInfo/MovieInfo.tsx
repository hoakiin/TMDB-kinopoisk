import type { MovieDetails } from "../../../store/tmdbApi.types";
import { formatRuntime } from "../../../common/utils";
import { useNavigate } from "react-router";
import { getFavorites, saveFavorites } from "../../../common/utils";
import { FavoriteButton } from "../../../common/components/MovieCard/FavoriteButton/FavoriteButton";
import { useEffect, useState } from "react";
import s from "./MovieInfo.module.css";
import type { FavoriteMovie } from "../../../common/utils/favorites";

type Props = {
  movie: MovieDetails;
};

export const MovieInfo = ({ movie }: Props) => {
  const navigate = useNavigate();
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w342${movie.poster_path}`
    : null;

  const year = movie.release_date?.slice(0, 4);

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

  return (
    <div className={s.info}>
      <div className={s.content}>
        <div className={s.posterWrapper}>
          {posterUrl ? (
            <img className={s.poster} src={posterUrl} loading="lazy"/>
          ) : (
            <div className={s.noPoster}>No Poster</div>
          )}
        </div>

        <div className={s.infoContent}>
          <div className={s.titleRow}>
            <h1 className={s.title}>
              {movie.title} {year && <span>({year})</span>}
            </h1>
            <div className={s.actions}>
              <FavoriteButton isActive={isFavorite} onToggle={toggleFavorite} />
              <button className={s.backBtn} onClick={() => navigate(-1)}>
                ← Back
              </button>
            </div>
          </div>

          <div className={s.meta}>
            <span>⭐ {movie.vote_average?.toFixed(1)}</span>
            <span>Runtime: {formatRuntime(movie.runtime)}</span>
          </div>

          <p className={s.overview}>{movie.overview}</p>

          <h3>Genres</h3>
          <div className={s.genres}>
            {movie.genres.map((genre) => (
              <span key={genre.id} className={s.genre}>
                {genre.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
