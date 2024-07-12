import { PlusIcon } from "@/app/_components/server";
import { getGoalList } from "@/app/_services/client/goal/goal";
import { auth } from "@/auth";

import { GoalDragDrop } from "./components";

import Link from "next/link";

const GoalPage = async () => {
  const session = await auth();
  const goalList = await getGoalList(
    session?.sessionToken as string,
    session?.user.userId as number,
  );

  return (
    <div className="relative pt-[2.6rem] px-[2.4rem]">
      <Link
        className="absolute -top-[3.4rem] right-[2.4rem] z-headerLink"
        href="/goal/editor/create"
        title="목표 생성하기"
      >
        <PlusIcon />
      </Link>
      <GoalDragDrop goal={goalList} />
    </div>
  );
};

export default GoalPage;
