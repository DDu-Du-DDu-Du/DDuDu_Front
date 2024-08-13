import { useState } from "react";

interface UseTimeChangeProps {
  label: string;
  onStartTimeChange?: (date: string) => void;
  onEndTimeChange?: (date: string) => void;
}

const useTimeChange = ({ label, onStartTimeChange, onEndTimeChange }: UseTimeChangeProps) => {
  const [time, setTime] = useState(label);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTime(event.target.value);

    if (onStartTimeChange) {
      onStartTimeChange(event.target.value);
    }

    if (onEndTimeChange) {
      onEndTimeChange(event.target.value);
    }
  };

  return {
    time,
    handleTimeChange,
  };
};

export default useTimeChange;
