import { Fragment } from "react";

import { GoalTodoListItem } from "@/app/_components/server";
import { RepeatDdudusPattern, RepeatDdudusType } from "@/app/_types/response/goal/goal";

import { DAY_OF_WEEK_STRING } from "../../../../[id]/repeat/components/DDuDuRepeatForm/DDuDuRepeatForm.constants";

interface DDuDURepeatListProps {
  repeatDDuDu: RepeatDdudusType[];
  goalId: string;
}

const DDuDuRepeatList = ({ repeatDDuDu, goalId }: DDuDURepeatListProps) => {
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

  return (
    <ul className="flex flex-col max-h-[19rem] gap-[0.8rem] mt-[1rem] overflow-y-auto scrollbar-hide">
      {repeatDDuDu?.map(({ id, name, repeatPattern, startDate, endDate }) => (
        <Fragment key={id}>
          <GoalTodoListItem
            id={id}
            title={name}
            repeatDays={convertRepeatDays(repeatPattern)}
            startDate={startDate}
            endDate={endDate}
            goalId={goalId}
          />
        </Fragment>
      ))}
    </ul>
  );
};

export default DDuDuRepeatList;
