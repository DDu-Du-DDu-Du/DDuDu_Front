import formatDateRange from "@/app/_utils/formatDateRange/formatDateRange";

import Link from "next/link";

// repeatDays 타입에 대한 Response 값에 따라 추후 변경 필요할 수도 있음
export interface GoalTodoListItemProps {
  id: number;
  title: string;
  repeatDays: string;
  startDate: string;
  endDate: string;
  goalId?: string;
}

const GoalTodoListItem = ({
  id,
  title,
  repeatDays,
  startDate,
  endDate,
  goalId,
}: GoalTodoListItemProps) => {
  return (
    <li className="list-none font-regular">
      <Link
        className="block rounded-radius10 bg-white_100 px-[1.8rem] py-[1.2rem]"
        href={
          goalId ? `/goal/editor/${goalId}/repeat?id=${id}` : `/goal/editor/create/repeat?id=${id}`
        }
        title="반복 투두리스트 수정하기"
      >
        <strong className="block text-size13 leading-[1.3rem] font-regular">{title}</strong>
        <span className="mr-[0.5rem] text-size11 font-light text-example_gray_900">
          {repeatDays}
        </span>
        <span className="text-size11 font-light text-example_gray_900">
          {formatDateRange(startDate, endDate)}
        </span>
      </Link>
    </li>
  );
};

export default GoalTodoListItem;
