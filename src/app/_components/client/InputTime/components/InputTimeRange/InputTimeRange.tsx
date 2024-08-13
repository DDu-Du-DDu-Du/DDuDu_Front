import InputTimeSingle from "../InputTimeSingle/InputTimeSingle";
import { useTimeRange } from "./hooks";

interface InputTimeRangeProps {
  beginAt: string;
  nameStart: string;
  labelStart: string;
  nameEnd: string;
  labelEnd: string;
}

const InputTimeRange = ({
  beginAt,
  nameStart,
  labelStart,
  nameEnd,
  labelEnd,
}: InputTimeRangeProps) => {
  const { startTime, handleStartTimeChange, handleEndTimeChange } = useTimeRange({ beginAt });

  return (
    <div className="flex gap-[0.8rem]">
      <InputTimeSingle
        label={labelStart}
        name={nameStart}
        onStartTimeChange={handleStartTimeChange}
      />
      <InputTimeSingle
        label={labelEnd}
        name={nameEnd}
        startTime={startTime}
        onEndTimeChange={handleEndTimeChange}
      />
    </div>
  );
};

export default InputTimeRange;
