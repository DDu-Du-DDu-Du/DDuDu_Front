import { DayContentProps } from "react-day-picker";

import formatDateToYYYYMMDD from "@/app/_utils/formatDateToYYYYMMDD/formatDateToYYYYMMDD";

const useFeedCalenderDayConetent = (selectedDay: DayContentProps) => {
  const formattedDate = formatDateToYYYYMMDD(selectedDay.date);
  const [selectedYear, selectedMonth, selectedDate] = [
    selectedDay.date.getFullYear(),
    selectedDay.date.getMonth() + 1,
    selectedDay.date.getDate(),
  ];
  const today = new Date();
  const [currentYear, currentMonth, currentDate] = [
    today.getFullYear(),
    today.getMonth() + 1,
    today.getDate(),
  ];

  const isToday =
    selectedYear === currentYear && selectedMonth === currentMonth && selectedDate === currentDate;

  return { isToday, selectedDate, formattedDate };
};

export default useFeedCalenderDayConetent;
