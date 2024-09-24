import { useMemo } from "react";
import { CaptionProps } from "react-day-picker";

import { useClickAway, useToggle } from "@/app/_hooks";

import { GoalsType } from "../../../../FeedCalendar";

interface useMonthlyCalendarProps {
  monthlyGoals?: GoalsType;
  props: CaptionProps;
}

const useMonthlyCalendar = ({ monthlyGoals, props }: useMonthlyCalendarProps) => {
  const monthlyGoalList = useMemo(
    () => monthlyGoals?.contents?.split("\n"),
    [monthlyGoals?.contents],
  );
  const currentYear = props.displayMonth.getFullYear();
  const currentMonth = props.displayMonth.getMonth() + 1;

  const { isToggle, handleToggleOn, handleToggleOff } = useToggle();
  const monthlyGoalsRef = useClickAway<HTMLSelectElement>(handleToggleOff);

  const handleMonthlyGoalUpdate = () => {
    handleToggleOn();
  };
  return {
    isToggle,
    monthlyGoalsRef,
    monthlyGoalList,
    currentYear,
    currentMonth,
    handleToggleOff,
    handleMonthlyGoalUpdate,
  };
};

export default useMonthlyCalendar;
