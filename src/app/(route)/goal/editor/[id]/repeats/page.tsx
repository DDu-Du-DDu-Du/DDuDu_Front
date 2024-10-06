import { Header } from "@/app/_components/client";
import { PlusIcon } from "@/app/_components/server";

import DDuDuRepeatList from "./components/DDuDuRepeatList/DDuDuRepeatList";

import Link from "next/link";

interface GoalEditorDDuDuRepeatsPageProps {
  params: { id: string };
}

const GoalEditorDDuDuRepeatsPage = ({ params }: GoalEditorDDuDuRepeatsPageProps) => {
  const { id: goalId } = params;

  return (
    <>
      <Header headerLabel="반복관리" />
      <div className="relative h-[100%] pt-[8.5rem] px-[2.4rem] bg-example_gray_100">
        <Link
          className="absolute top-[1.8rem] right-[2.4rem] z-headerLink"
          href={`/goal/editor/${goalId}/repeat`}
          title="반복 뚜두 생성하기"
          scroll={false}
        >
          <PlusIcon />
        </Link>
        <DDuDuRepeatList goalId={goalId} />
      </div>
    </>
  );
};

export default GoalEditorDDuDuRepeatsPage;
