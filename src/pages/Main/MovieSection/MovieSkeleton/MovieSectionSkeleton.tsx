import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import s from "./MovieSectionSkeleton.module.css";

export const MovieSectionSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="var(--surface-color)"
      highlightColor="var(--card-hover)"
    >
      <section className={s.section}>
        <div className={s.sectionHeader}>
          <Skeleton width={200} height={32} />
          <Skeleton width={100} height={32} borderRadius={15} />
        </div>

        <div className={s.grid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={s.skeletonCard}>
              <Skeleton containerClassName={s.posterWrapper} className={s.poster} />
              <Skeleton width="80%" height={20} />
            </div>
          ))}
        </div>
      </section>
    </SkeletonTheme>
  );
};
