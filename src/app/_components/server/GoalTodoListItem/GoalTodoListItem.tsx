import formatDateRange from "@/app/_utils/formatDateRange/formatDateRange";

export interface GoalTodoListItemProps {
  title: string;
  repeatDays: string;
  startDate: string;
  endDate: string;
}

const GoalTodoListItem = ({ title, repeatDays, startDate, endDate }: GoalTodoListItemProps) => {
  return (
    <li className="list-none rounded-radius10 bg-[#F5F5F5] px-[1.8rem] py-[1.2rem] font-regular">
      <strong className="mb-[0.3rem] block text-size13">{title}</strong>
      <span className="mr-[1rem] text-size11 font-light text-example_gray_900">{repeatDays}</span>
      <span className="text-size11 font-light text-example_gray_900">
        {formatDateRange(startDate, endDate)}
      </span>
    </li>
  );
};

export default GoalTodoListItem;
