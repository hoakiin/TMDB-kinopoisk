import { SORT_OPTIONS } from "../../../../common/constants";
import type { SortBy } from "../../../../store/tmdbApi.types";
import s from "./SortSelect.module.css";

type Props = {
  value: SortBy;
  onChange: (sort: SortBy) => void;
};

export const SortSelect = ({ value, onChange }: Props) => {
  return (
    <div className={s.wrapper}>
      <span className={s.label}>Sort by</span>

      <div className={s.selectWrapper}>
        <select
          className={s.select}
          value={value}
          onChange={(e) => onChange(e.target.value as SortBy)}
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>

        <span className={s.arrow}>▾</span>
      </div>
    </div>
  );
};
