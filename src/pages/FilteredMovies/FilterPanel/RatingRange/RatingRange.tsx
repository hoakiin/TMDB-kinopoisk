import s from "./RatingRange.module.css";

type Props = {
  min: number;
  max: number;
  valueMin: number;
  valueMax: number;
  step?: number;
  onChangeMin: (value: number) => void;
  onChangeMax: (value: number) => void;
};

export const RatingRange = ({
  min,
  max,
  valueMin,
  valueMax,
  step = 0.1,
  onChangeMin,
  onChangeMax,
}: Props) => {
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val <= valueMax) {
      onChangeMin(val);
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    if (val >= valueMin) {
      onChangeMax(val);
    }
  };

  const minPercent = ((valueMin - min) / (max - min)) * 100;
  const maxPercent = ((valueMax - min) / (max - min)) * 100;

  return (
    <div className={s.container}>
      <div className={s.labels}>
        <span>Rating</span>
        <span>{valueMin.toFixed(1)} - {valueMax.toFixed(1)}</span>
      </div>
      <div className={s.sliderContainer}>
        <div
          className={s.track}
        />
        <div
          className={s.range}
          style={{ left: `${minPercent}%`, right: `${100 - maxPercent}%` }}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMin}
          onChange={handleMinChange}
          className={`${s.slider} ${s.sliderMin}`}
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={valueMax}
          onChange={handleMaxChange}
          className={`${s.slider} ${s.sliderMax}`}
        />
      </div>
    </div>
  );
};
