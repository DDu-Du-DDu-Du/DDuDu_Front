import { useState } from "react";

interface UseTimeRangeProps {
  beginAt: string;
}

const useTimeRange = ({ beginAt }: UseTimeRangeProps) => {
  const [startTime, setStartTime] = useState(beginAt || "");
  const [endTime, setEndTime] = useState("");

  const handleStartTimeChange = (date: string) => {
    setStartTime(date);
  };
  const handleEndTimeChange = (date: string) => {
    setEndTime(date);
  };

  return {
    startTime,
    endTime,
    handleStartTimeChange,
    handleEndTimeChange,
  };
};

export default useTimeRange;
