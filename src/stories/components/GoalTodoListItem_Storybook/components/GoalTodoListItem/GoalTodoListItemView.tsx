import { GoalTodoListItem } from "@/app/_components/server";
import { GoalTodoListItemProps } from "@/app/_components/server/GoalTodoListItem/GoalTodoListItem";

const GoalTodoListItemView = (props: GoalTodoListItemProps) => {
  return <GoalTodoListItem {...props} />;
};

export default GoalTodoListItemView;
