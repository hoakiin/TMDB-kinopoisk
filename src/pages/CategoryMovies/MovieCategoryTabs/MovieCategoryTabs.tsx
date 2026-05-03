import { movieCategories } from "../../../common/constants";
import s from "./MovieCategoryTabs.module.css";

type Props = {
  current: string;
  onChange: (cat: string) => void;
};

export const MovieCategoryTabs = ({ current, onChange }: Props) => {
  return (
    <div className={s.tabs}>
      {movieCategories.map((c) => (
        <button
          key={c.key}
          onClick={() => onChange(c.key)}
          className={`${s.tabButton} ${
            current === c.key ? s.active : ""
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
};