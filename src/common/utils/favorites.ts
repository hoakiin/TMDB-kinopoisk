export type FavoriteMovie = {
  id: number;
  title: string;
  poster_path: string | null;
  vote_average: number;
};

const KEY = "favorites";

export const getFavorites = (): FavoriteMovie[] => {
  const data = localStorage.getItem(KEY);
  return data ? JSON.parse(data) : [];
};

export const saveFavorites = (movies: FavoriteMovie[]) => {
  localStorage.setItem(KEY, JSON.stringify(movies));
};
