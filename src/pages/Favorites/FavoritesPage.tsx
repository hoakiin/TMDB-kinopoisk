import s from "./FavoritesPage.module.css";
import type { FavoriteMovie as Movie } from "../../common/utils";
import { useEffect, useState } from "react";
import { MovieCard } from "../../common/components/MovieCard/MovieCard";
import { getFavorites } from "../../common/utils";

export const FavoritesPage = () => {
  const [favorites, setFavorites] = useState<Movie[]>([]);

  const loadFavorites = () => {
    setFavorites(getFavorites());
  };

  useEffect(() => {
    loadFavorites();

    const handler = () => {
      loadFavorites();
    };

    window.addEventListener("favoritesChanged", handler);

    return () => {
      window.removeEventListener("favoritesChanged", handler);
    };
  }, []);

  return (
    <div>
      <h1>Favorites</h1>
      {favorites.length ? (
        <h2>Favorite Movies</h2>
      ) : (
        <p className={s.emptyPage}>
          Add movies to favorites to see them on this page.
        </p>
      )}

      <div className={s.grid}>
        {favorites.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};
