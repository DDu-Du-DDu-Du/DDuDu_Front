import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { RepeatDdudusType } from "@/app/_types/response/goal/goal";

import { DDuDuRepeatFormDataType } from "../../DDuDuRepeatForm";
import { DayOfMonthString } from "../../DDuDuRepeatForm.types";

interface UseRepeatDDuDuProps {
  currentRepeatDDuDu?: RepeatDdudusType;
  currentRepeatMonthData: DayOfMonthString[];
  setIsLoad: (isLoad: boolean) => void;
}

const useRepeatDDuDuEditor = ({
  currentRepeatDDuDu,
  currentRepeatMonthData,
  setIsLoad,
}: UseRepeatDDuDuProps) => {
  const methods = useForm<DDuDuRepeatFormDataType>({
    defaultValues: {
      name: currentRepeatDDuDu?.name,
      repeatType: currentRepeatDDuDu?.repeatPattern.repeatType,
      repeatDaysOfWeek: currentRepeatDDuDu?.repeatPattern.repeatDaysOfWeek || [],
      repeatDaysOfMonth: currentRepeatMonthData,
      lastDay: currentRepeatDDuDu?.repeatPattern.lastDay ? ["lastDay"] : [],
      startDate: currentRepeatDDuDu?.startDate,
      endDate: currentRepeatDDuDu?.endDate,
      beginAt: currentRepeatDDuDu?.beginAt,
      endAt: currentRepeatDDuDu?.endAt,
    },
  });
  const { errors } = methods.formState;

  const selectedDateValue = methods.watch("repeatType");
  const selectedDayOfWeekItems = methods.watch("repeatDaysOfWeek");
  const selectedDayOfMonthItems = methods.watch("repeatDaysOfMonth");
  const selectedLastDay = methods.watch("lastDay");

  useEffect(() => {
    setIsLoad(true);

    /* eslint-disable react-hooks/exhaustive-deps */
  }, []);

  return {
    methods,
    errors,
    selectedDateValue,
    selectedDayOfWeekItems,
    selectedDayOfMonthItems,
    selectedLastDay,
  };
};

export default useRepeatDDuDuEditor;
