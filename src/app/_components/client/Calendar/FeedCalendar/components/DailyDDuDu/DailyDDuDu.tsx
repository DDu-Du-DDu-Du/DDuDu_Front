import { CheckIcon } from "@/app/_components/server";

interface DailyDDuDuProps {
  totalCount: number;
  doneCount: number;
  restCount: number;
}

const DailyDDuDu = ({ totalCount, doneCount, restCount }: DailyDDuDuProps) => {
  const upperLimitRestCount = restCount > 99 ? "+99" : restCount;
  const isAllDDuDuDone = totalCount === doneCount;

  return (
    <article className="rounded-full shrink-0 w-[2.4rem] h-[2.4rem] bg-sub_3 flex justify-center items-center">
      {isAllDDuDuDone ? (
        <CheckIcon
          fill="white"
          size={14}
        />
      ) : (
        <div className="w-[2.3rem] h-[2.3rem] p-4 bg-sub_gray_100 rounded-full flex justify-center items-center text-sub_3 text-size10">
          {upperLimitRestCount}
        </div>
      )}
    </article>
  );
};

export default DailyDDuDu;
