import { getTimeAgo } from "./utils";

import Link from "next/link";

export interface NotificationTimeReminderProps {
  todoId: string;
  todoTitle: string;
  todoDate: string;
}

const NotificationTimeReminder = ({
  todoId,
  todoTitle,
  todoDate,
}: NotificationTimeReminderProps) => {
  return (
    <li className="list-none">
      <Link
        className="block rounded-radius15 bg-example_gray_100 px-[1.4rem] py-[1.6rem]"
        href={`/todo/${todoId}`}
        title={`${todoTitle} 바로가기`}
      >
        <strong className="block text-size13 leading-[1.3rem] font-regular">{todoTitle}</strong>
        <span className="text-size11 font-light">{getTimeAgo(todoDate)}</span>
      </Link>
    </li>
  );
};

export default NotificationTimeReminder;
