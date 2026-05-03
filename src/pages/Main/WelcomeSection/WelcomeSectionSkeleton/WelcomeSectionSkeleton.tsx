import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import s from "./WelcomeSectionSkeleton.module.css";

export const WelcomeSectionSkeleton = () => {
  return (
    <SkeletonTheme
      baseColor="var(--surface-color)"
      highlightColor="var(--card-hover)"
    >
      <div className={s.welcome}>
        <div className={s.content}>
          <Skeleton width={300} height={47} />
          <Skeleton width={400} height={22} style={{ margin: "0 0 20px 0" }} />
          <Skeleton height={40} width={300} borderRadius={8} />
        </div>
      </div>
    </SkeletonTheme>
  );
};
