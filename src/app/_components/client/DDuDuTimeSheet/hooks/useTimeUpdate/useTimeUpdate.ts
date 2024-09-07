import { useEffect, useState } from "react";

import { DDuDuTimeRangeType, DDuDuTimeType } from "@/app/(route)/feed/feed.types";

interface UseTimeUpdateProps {
  currentDDuDuTime: DDuDuTimeType;
  onChangeDDuDuTime: (selectedTime: DDuDuTimeRangeType) => void;
}

const useTimeUpdate = ({ currentDDuDuTime, onChangeDDuDuTime }: UseTimeUpdateProps) => {
  const { beginAt, endAt } = currentDDuDuTime;

  const [isErrorMessage, setIsErrorMessage] = useState(false);
  const [beginHour, setBeginHour] = useState(0);
  const [beginMin, setBeginMin] = useState(0);
  const [endHour, setEndHour] = useState(0);
  const [endMin, setEndMin] = useState(0);

  useEffect(() => {
    if (!beginAt || !endAt) {
      return;
    }

    const [beginHour, beginMin] = beginAt.split(":").map(Number);
    const [endHour, endMin] = endAt.split(":").map(Number);

    setBeginHour(beginHour);
    setBeginMin(beginMin);
    setEndHour(endHour);
    setEndMin(endMin);
  }, [beginAt, endAt]);

  const handleDDuDuTimeChange = () => {
    const beginTime = beginHour * 60 + beginMin;
    const endTime = endHour * 60 + endMin;

    if (beginTime > endTime) {
      setIsErrorMessage(true);
      return;
    }

    setIsErrorMessage(false);
    onChangeDDuDuTime({ beginHour, beginMin, endHour, endMin });
  };

  const handleChangeBeginHour = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBeginHour(Number(event.target.value));
  };
  const handleChangeBeginMin = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setBeginMin(Number(event.target.value));
  };
  const handleChangeEndHour = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEndHour(Number(event.target.value));
  };
  const handleChangeEndMin = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setEndMin(Number(event.target.value));
  };

  return {
    beginHour,
    beginMin,
    endHour,
    endMin,
    isErrorMessage,
    handleDDuDuTimeChange,
    handleChangeBeginHour,
    handleChangeBeginMin,
    handleChangeEndHour,
    handleChangeEndMin,
  };
};

export default useTimeUpdate;
