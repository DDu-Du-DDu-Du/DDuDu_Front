import { useState } from "react";

interface useDateChangeProps {
  label: string;
  onMinDateChange?: (date: string) => void;
  onMaxDateChange?: (date: string) => void;
}

const useDateChange = ({ label, onMinDateChange, onMaxDateChange }: useDateChangeProps) => {
  const [date, setDate] = useState(label);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDate(event.target.value);

    if (onMinDateChange) {
      onMinDateChange(event.target.value);
    }

    if (onMaxDateChange) {
      onMaxDateChange(event.target.value);
    }
  };

  return {
    date,
    handleInputChange,
  };
};

export default useDateChange;
