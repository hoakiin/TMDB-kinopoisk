import { useSelector } from "react-redux";
import type { RootState } from "../../app/store";

export const useGlobalLoading = () => {
  return useSelector((state: RootState) => {
    const queries = Object.values(state.tmdbApi.queries || {});

    const isLoadingQuery = queries.some((q) => q?.status === "pending");

    return isLoadingQuery;
  });
};
