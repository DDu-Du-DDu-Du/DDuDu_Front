import { useMemo } from "react";

import { GoalsType } from "../../../FeedCalendar/FeedCalendar";

interface UseCalendarProps {
  selectedDDuDuDate: string;
  weeklyGoals?: GoalsType;
}

const useCalendar = ({ weeklyGoals, selectedDDuDuDate }: UseCalendarProps) => {
  const weeklyGoalList = useMemo(() => weeklyGoals?.contents?.split("\n"), [weeklyGoals?.contents]);

  const [year, month] = selectedDDuDuDate.split("-");
  const selectedDate = useMemo(() => {
    return {
      year,
      month,
    };
  }, [year, month]);

  return {
    weeklyGoalList,
    selectedDate,
  };
};

export default useCalendar;
