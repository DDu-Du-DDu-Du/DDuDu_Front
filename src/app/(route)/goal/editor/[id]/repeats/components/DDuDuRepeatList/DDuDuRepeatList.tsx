"use client";

import { Fragment } from "react";

import { GoalTodoListItem } from "@/app/_components/server";
import { useGoalFormStore } from "@/app/_store";

import { DAY_OF_WEEK_STRING } from "../../../repeat/components/DDuDuRepeatForm/DDuDuRepeatForm.constants";

interface DDuDuRepeatListProps {
  goalId: string;
}

const DDuDuRepeatList = ({ goalId }: DDuDuRepeatListProps) => {
  const { repeatDDuDu } = useGoalFormStore();

  return (
    <ul className="flex flex-col max-h-[19rem] gap-[0.8rem]">
      {repeatDDuDu.map(({ id, name, repeatPattern, startDate, endDate }) => (
        <Fragment key={id}>
          <GoalTodoListItem
            id={id}
            title={name}
            repeatDays={
              (repeatPattern.repeatType === "WEEKLY"
                ? repeatPattern.repeatDaysOfWeek
                    ?.map((weekDay) => DAY_OF_WEEK_STRING[weekDay])
                    .join(" ")
                : repeatPattern.repeatDaysOfMonth?.join(" ")) || "매일"
            }
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
