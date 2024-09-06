import { Fragment } from "react";

import { GoalTodoListItem } from "@/app/_components/server";
import { RepeatDdudusType } from "@/app/_types/response/goal/goal";

import { convertRepeatDays } from "./utils";

interface DDuDURepeatListProps {
  repeatDDuDu: RepeatDdudusType[];
  goalId: string;
}

const DDuDuRepeatList = ({ repeatDDuDu, goalId }: DDuDURepeatListProps) => {
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
