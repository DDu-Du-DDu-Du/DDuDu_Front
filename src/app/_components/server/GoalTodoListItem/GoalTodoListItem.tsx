import formatDateRange from "@/app/_utils/formatDateRange/formatDateRange";

// repeatDays 타입에 대한 Response 값에 따라 추후 변경 필요할 수도 있음
export interface GoalTodoListItemProps {
  title: string;
  repeatDays: string;
  startDate: string;
  endDate: string;
}

const GoalTodoListItem = ({ title, repeatDays, startDate, endDate }: GoalTodoListItemProps) => {
  return (
    <li className="list-none rounded-radius10 bg-example_gray_100 px-[1.8rem] py-[1.2rem] font-regular">
      <strong className="mb-[0.3rem] block text-size13">{title}</strong>
      <span className="mr-[1rem] text-size11 font-light text-example_gray_900">{repeatDays}</span>
      <span className="text-size11 font-light text-example_gray_900">
        {formatDateRange(startDate, endDate)}
      </span>
    </li>
  );
};

export default GoalTodoListItem;
