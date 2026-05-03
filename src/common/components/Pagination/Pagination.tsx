import { getPaginationPages } from "../../utils";
import s from "./Pagination.module.css";

type Props = {
  currentPage: number;
  totalPages: number;
  onChange: (page: number) => void;
};

export const Pagination = ({ currentPage, totalPages, onChange }: Props) => {
  if (totalPages <= 1) return null;

  const pages = getPaginationPages(currentPage, totalPages);

  return (
    <div className={s.pagination}>
      {pages.map((item, idx) => {
        if (item === "...") {
          return <span key={`dots-${idx}`}>...</span>;
        }

        return (
          <button
            key={item}
            onClick={() => onChange(item)}
            className={item === currentPage ? s.active : s.btn}
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};