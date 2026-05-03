import type { MouseEvent } from "react";
import s from "./FavoriteButton.module.css";

type Props = {
  isActive: boolean;
  onToggle: () => void;
};

export const FavoriteButton = ({ isActive, onToggle }: Props) => {
  const handleClick = (e: MouseEvent) => {
    e.stopPropagation();
    onToggle();
  };

  return (
    <button
      className={`${s.btn} ${isActive ? s.active : ""}`}
      onClick={handleClick}
    >
      <svg
        width="20"
        height="20"
        viewBox="0 0 16 16"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1.33337 6.0914C1.33337 9.33333 4.01299 11.0609 5.97453 12.6073C6.66671 13.1529 7.33337 13.6667 8.00004 13.6667C8.66671 13.6667 9.33337 13.1529 10.0256 12.6073C11.9871 11.0609 14.6667 9.33333 14.6667 6.0914C14.6667 2.84944 10.9999 0.55031 8.00004 3.66709C5.00015 0.55031 1.33337 2.84944 1.33337 6.0914Z"
          fill="currentColor"
        />
      </svg>
    </button>
  );
};