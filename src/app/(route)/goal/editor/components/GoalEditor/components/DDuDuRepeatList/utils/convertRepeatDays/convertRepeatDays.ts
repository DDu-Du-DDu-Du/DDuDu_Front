import { DAY_OF_WEEK_STRING } from "@/app/(route)/goal/editor/[id]/repeat/components/DDuDuRepeatForm/DDuDuRepeatForm.constants";
import { RepeatDdudusPattern } from "@/app/_types/response/goal/goal";

const convertRepeatDays = (repeatPattern: RepeatDdudusPattern) => {
  if (repeatPattern.repeatType === "DAILY") {
    return "매일";
  } else if (repeatPattern.repeatType === "WEEKLY") {
    return (
      "매주 " +
      repeatPattern.repeatDaysOfWeek?.map((weekDay) => DAY_OF_WEEK_STRING[weekDay]).join(" ")
    );
  } else {
    return (
      "매월 " +
      repeatPattern.repeatDaysOfMonth?.join(" ") +
      (repeatPattern.lastDay ? " 마지막 날" : "")
    );
  }
};

export default convertRepeatDays;
