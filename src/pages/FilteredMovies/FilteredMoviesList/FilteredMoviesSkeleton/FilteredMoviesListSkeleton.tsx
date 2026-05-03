import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import s from "./FilteredMoviesListSkeleton.module.css";

export const FilteredMoviesListSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="var(--surface-color)"
      highlightColor="var(--card-hover)"
    >
      <div className={s.wrapper}>
        <div className={s.grid}>
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className={s.skeletonCard}>
              <Skeleton containerClassName={s.posterWrapper} className={s.poster} />
              <Skeleton width="80%" height={20} />
            </div>
          ))}
        </div>

        <div className={s.pagination}>
          <Skeleton width={300} height={36} borderRadius={8} />
        </div>
      </div>
    </SkeletonTheme>
  );
};
