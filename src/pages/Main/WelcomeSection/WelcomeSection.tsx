import type { MovieCardType as Movie } from "../../../store/tmdbApi.types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { SearchForm } from "../../../common/components/SearchForm/SearchForm";
import s from "./WelcomeSection.module.css";

type Props = {
  movies: Movie[];
};

export const WelcomeSection = ({ movies }: Props) => {
  const navigate = useNavigate();

  const [backdrop, setBackdrop] = useState<string | null>(null);

  useEffect(() => {
    const withBackdrop = movies.filter((m) => m.backdrop_path);
    if (withBackdrop.length > 0) {
      const random = withBackdrop[Math.floor(Math.random() * withBackdrop.length)];
      setBackdrop(`https://image.tmdb.org/t/p/original${random.backdrop_path}`);
    }
  }, [movies]);

  const handleSearch = (query: string) => {
    if (query) {
      navigate(`/search?query=${encodeURIComponent(query)}`);
    }
  };

  return (
    <div className={s.welcome}>
      {backdrop && (
        <div
          className={s.backdrop}
          style={{ backgroundImage: `url(${backdrop})` }}
        />
      )}
      <div className={s.overlay} />

      <div className={s.content}>
        <h1>Welcome</h1>
        <p>Browse highlighted titles from TMDB</p>

        <SearchForm
          onSubmit={handleSearch}
        />
      </div>
    </div>
  );
};