import { useState } from "react";

interface useDateRange {
  todayDate: string;
}

const useDateRange = ({ todayDate }: useDateRange) => {
  const [minDate, setMinDate] = useState(todayDate);
  const [maxDate, setMaxDate] = useState("");

  const handleMinDateChange = (date: string) => {
    setMinDate(date);
  };
  const handleMaxDateChange = (date: string) => {
    setMaxDate(date);
  };

  return {
    minDate,
    maxDate,
    handleMinDateChange,
    handleMaxDateChange,
  };
};

export default useDateRange;
