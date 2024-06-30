import { ChevronRightIcon } from "@/app/_components/server";

import Link from "next/link";

interface GoalStatisticsProps {
  id?: number;
  goalName: string;
}

const GoalStatistics = ({ id, goalName }: GoalStatisticsProps) => {
  return (
    <div className="flex justify-between items-center mb-[2.8rem]">
      <strong className="inline-block py-[0.9rem] px-[1.9rem] bg-example_gray_100 rounded-radius15 select-none">
        {goalName}
      </strong>
      <Link
        href={`/statistics/goal/${id}`}
        title="목표 통계 페이지"
      >
        <ChevronRightIcon
          size={16}
          fill="#D9D9D9"
        />
      </Link>
    </div>
  );
};

export default GoalStatistics;
