import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import s from "./CategoryMoviesPageSkeleton.module.css";

export const CategoryMoviesPageSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="var(--surface-color)"
      highlightColor="var(--card-hover)"
    >
      <div className={s.wrapper}>
        <div className={s.tabs}>
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} width={120} height={36} borderRadius={6} />
          ))}
        </div>

        <Skeleton width={250} height={28} style={{ margin: "20px 0" }} />

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
