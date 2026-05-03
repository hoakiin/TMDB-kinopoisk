import { Routes, Route } from "react-router";
import { PageNotFound } from "../common/components/PageNotFound/PageNotFound";
import { CategoryMoviesPage } from "../pages/CategoryMovies/CategoryMoviesPage";
import { FilteredMoviesPage } from "../pages/FilteredMovies/FilteredMoviesPage";
import { SearchPage } from "../pages/Search/SearchPage";
import { FavoritesPage } from "../pages/Favorites/FavoritesPage";
import { MainPage } from "../pages/Main/MainPage";
import { MovieDetailsPage } from "../pages/MovieDetailsPage/MovieDetailsPage";

export const Path = {
  Main: "/",
  CategoryMovies: "/movies/:category",
  FilteredMovies: "/filtered",
  Search: "/search",
  Favorites: "/favorites",
  MovieDetails: "movie/:id",
  NotFound: "*",
} as const;

export const Routing = () => (
  <Routes>
    <Route path={Path.Main} element={<MainPage />} />
    <Route path={Path.CategoryMovies} element={<CategoryMoviesPage />} />
    <Route path={Path.FilteredMovies} element={<FilteredMoviesPage />} />
    <Route path={Path.Search} element={<SearchPage />} />
    <Route path={Path.Favorites} element={<FavoritesPage />} />
    <Route path={Path.MovieDetails} element={<MovieDetailsPage />} />

    <Route path={Path.NotFound} element={<PageNotFound />} />
  </Routes>
);
