import s from "./ErrorState.module.css";

type Props = {
  title?: string;
  message?: string;
  onRetry?: () => void;
};

export const ErrorState = ({
  title = "Something went wrong",
  message = "Please try again later",
  onRetry,
}: Props) => {
  return (
    <div className={s.container}>
      <h2 className={s.title}>{title}</h2>
      <p className={s.message}>{message}</p>

      {onRetry && (
        <button className={s.retryBtn} onClick={onRetry}>
          Try again
        </button>
      )}
    </div>
  );
};
