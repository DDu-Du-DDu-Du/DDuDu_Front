import { PlusIcon } from "@/app/_components/server";

import DDuDuRepeatList from "./components/DDuDuRepeatList/DDuDuRepeatList";

import Link from "next/link";

interface GoalEditorDDuDuRepeatsPageProps {
  params: { id: string };
}

const GoalEditorDDuDuRepeatsPage = ({ params }: GoalEditorDDuDuRepeatsPageProps) => {
  const { id: goalId } = params;

  return (
    <div className="relative pt-[2.6rem] px-[2.4rem]">
      <Link
        className="absolute -top-[3.4rem] right-[2.4rem] z-headerLink"
        href={`/goal/editor/${goalId}/repeat`}
        title="반복 뚜두 생성하기"
      >
        <PlusIcon />
      </Link>
      <DDuDuRepeatList goalId={goalId} />
    </div>
  );
};

export default GoalEditorDDuDuRepeatsPage;
