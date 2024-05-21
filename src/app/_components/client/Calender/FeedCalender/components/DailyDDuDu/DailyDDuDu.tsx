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
    <article className="rounded-full shrink-0 w-[2.4rem] h-[2.4rem] bg-example_gray_900 flex justify-center items-center">
      {isAllDDuDuDone ? (
        <CheckIcon
          fill="white"
          size={14}
        />
      ) : (
        <div className="w-[2.2rem] h-[2.2rem] p-4 bg-example_gray_500 rounded-full flex justify-center items-center text-white">
          {upperLimitRestCount}
        </div>
      )}
    </article>
  );
};

export default DailyDDuDu;
