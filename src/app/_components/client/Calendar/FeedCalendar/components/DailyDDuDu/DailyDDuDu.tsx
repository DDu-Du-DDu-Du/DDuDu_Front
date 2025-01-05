import { CheckIcon } from "@/app/_components/server";

import { twMerge } from "tailwind-merge";

interface DailyDDuDuProps {
  totalCount: number;
  doneCount: number;
  restCount: number;
}

const DailyDDuDu = ({ totalCount, doneCount, restCount }: DailyDDuDuProps) => {
  const upperLimitRestCount = restCount > 99 ? "+99" : restCount;
  const isAllDDuDuDone = totalCount === doneCount;

  return (
    <article
      className={twMerge(
        "rounded-full shrink-0 w-[2.4rem] h-[2.4rem] flex justify-center items-center",
        isAllDDuDuDone ? "bg-sub_3" : "bg-sub_1 border-solid border-[0.1rem] border-sub_3",
      )}
    >
      {isAllDDuDuDone ? (
        <CheckIcon
          fill="white"
          size={14}
        />
      ) : (
        <div className="text-sub_3 text-size10">{upperLimitRestCount}</div>
      )}
    </article>
  );
};

export default DailyDDuDu;
