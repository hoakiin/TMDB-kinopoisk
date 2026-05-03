import { useGetMovieGenresQuery } from "../../../store/tmdbApi";
import type { SortBy } from "../../../store/tmdbApi.types";
import s from "./FilterPanel.module.css";
import { RatingRange } from "./RatingRange/RatingRange";
import { SortSelect } from "./SortSelect/SortSelect";

type Props = {
  sortBy: SortBy;
  onSortChange: (sort: SortBy) => void;
  ratingMin: number;
  ratingMax: number;
  onRatingMinChange: (rating: number) => void;
  onRatingMaxChange: (rating: number) => void;
  selectedGenres: number[];
  onToggleGenre: (id: number) => void;
  onReset: () => void;
};

export const FilterPanel = ({
  sortBy,
  onSortChange,
  ratingMin,
  ratingMax,
  onRatingMinChange,
  onRatingMaxChange,
  selectedGenres,
  onToggleGenre,
  onReset,
}: Props) => {
  const { data: genres } = useGetMovieGenresQuery();

  return (
    <div>
      <h3 className={s.title}>Filters / Sort</h3>
      <SortSelect value={sortBy} onChange={onSortChange} />

      <RatingRange
        min={0}
        max={10}
        step={0.1}
        valueMin={ratingMin}
        valueMax={ratingMax}
        onChangeMin={onRatingMinChange}
        onChangeMax={onRatingMaxChange}
      />

      <div className={s.genres}>
        {genres?.genres.map((genre) => {
          const isActive = selectedGenres.includes(genre.id);

          return (
            <button
              key={genre.id}
              type="button"
              onClick={() => onToggleGenre(genre.id)}
              className={`${s.genre} ${isActive ? s.active : ""}`}
            >
              {genre.name}
            </button>
          );
        })}
      </div>

      <button type="button" onClick={onReset} className={s.resetBtn}>
        Reset filters
      </button>
    </div>
  );
};
