import { useState } from "react";

interface UseDDuDuDateProps {
  handleCalendarSheetToggleOn: () => void;
  handleDDuDuSheetToggleOff: () => void;
}

const useDDuDuDate = ({
  handleCalendarSheetToggleOn,
  handleDDuDuSheetToggleOff,
}: UseDDuDuDateProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [currentDate, setCurrentDate] = useState("");
  const [currentCalendarType, setCurrentCalendarType] = useState<"repeat" | "change">("change");

  const handleSelectedDate = (selectedDate: Date | undefined) => {
    setSelectedDate(selectedDate);
  };

  const handleSelectDifferentDate = (type: "change" | "repeat", currentDate: string) => {
    setCurrentCalendarType(type);
    setCurrentDate(currentDate);
    handleCalendarSheetToggleOn();
    handleDDuDuSheetToggleOff();
  };

  return {
    selectedDate,
    currentDate,
    currentCalendarType,
    handleSelectedDate,
    handleSelectDifferentDate,
  };
};

export default useDDuDuDate;
