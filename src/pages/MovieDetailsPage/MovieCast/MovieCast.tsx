import { useGetMovieCreditsQuery } from "../../../store/tmdbApi";
import s from "./MovieCast.module.css";

type Props = {
  movieId: number;
};

export const MovieCast = ({ movieId }: Props) => {
  const { data } = useGetMovieCreditsQuery(movieId);

  const cast = data?.cast.slice(0, 6) ?? [];

  if (cast.length === 0) return null;

  return (
    <div className={s.cast}>
      <h3>Cast</h3>
      <div className={s.castList}>
        {cast.map((c) => (
          <div key={c.id} className={s.castMember}>
            <div className={s.avatarWrapper}>
              {c.profile_path ? (
                <img
                  loading="lazy"
                  className={s.avatar}
                  src={`https://image.tmdb.org/t/p/w185${c.profile_path}`}
                  alt={c.name}
                />
              ) : (
                <div className={s.noImage}>No Image</div>
              )}
            </div>
            <p className={s.name}>{c.name}</p>
            <p className={s.character}>{c.character}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
