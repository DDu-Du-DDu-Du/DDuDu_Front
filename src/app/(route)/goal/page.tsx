import { PlusIcon } from "@/app/_components/server";
import { getGoalList } from "@/app/_services/client/goal/goal";
import { auth } from "@/auth";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { GoalDragDrop } from "./components";

import Link from "next/link";

const GoalPage = async () => {
  const session = await auth();

  const queryclient = new QueryClient();
  await queryclient.prefetchQuery({
    queryKey: ["goal", String(session?.user.userId)],
    queryFn: () => getGoalList(session?.sessionToken as string, String(session?.user.userId)),
  });
  const dehydratedState = dehydrate(queryclient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <div className="relative pt-[2.6rem] px-[2.4rem]">
        <Link
          className="absolute -top-[3.4rem] right-[2.4rem] z-headerLink"
          href="/goal/editor/create"
          title="목표 생성하기"
        >
          <PlusIcon />
        </Link>
        <GoalDragDrop />
      </div>
    </HydrationBoundary>
  );
};

export default GoalPage;
