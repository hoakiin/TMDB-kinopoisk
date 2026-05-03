import { useEffect, useState, type ChangeEvent } from "react";
import s from "./SearchForm.module.css";

type Props = {
  onSubmit: (query: string) => void;
  onClear?: () => void;
  initialValue?: string;
  className?: string;
};

export const SearchForm = ({ onSubmit, onClear, initialValue = "", className = "" }: Props) => {
  const [inputValue, setInputValue] = useState(initialValue);

  useEffect(() => {
    setInputValue(initialValue);
  }, [initialValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInputValue(val);
    if (val === "") {
      onClear?.();
    }
  };

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
      const trimmed = inputValue.trim();
      onSubmit(trimmed);
    }} className={`${s.searchForm} ${className}`}>
      <input
        type="search"
        placeholder={"Search for a movie"}
        value={inputValue}
        onChange={handleChange}
      />
      <button type="submit" className={s.searchBtn} disabled={!inputValue.trim()}>Search</button>
    </form>
  );
};
