"use client";

import { useEffect } from "react";

import { GOAL_KEY } from "@/app/_constants/queryKey/queryKey";
import { getGoalList } from "@/app/_services/client/goal/goal";
import { GoalType } from "@/app/_types/response/goal/goal";
import { useQuery } from "@tanstack/react-query";

import DragDrop from "./components/DragDrop/DragDrop";
import { useAnimationChecker, useDragDrop } from "./hooks";

import { useSession } from "next-auth/react";

const GoalDragDrop = () => {
  const { data: session } = useSession();
  const { data: goals, refetch } = useQuery<GoalType[]>({
    queryKey: [GOAL_KEY.GOAL_LIST],
    queryFn: () => getGoalList(session?.sessionToken as string, String(session?.user.userId)),
    enabled: !!session,
  });

  const { progressGoalList, closedGoalList, onGoalsDragEnd } = useDragDrop({ goals });
  const { checker } = useAnimationChecker();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checker || !progressGoalList || !closedGoalList) {
    return null;
  }

  return (
    <>
      <article className="pb-8">
        <h3 className="text-size14 font-medium mb-6 text-gray-500">진행중 목표</h3>
        <DragDrop
          status="IN_PROGRESS"
          goalList={progressGoalList}
          onGoalsDragEnd={onGoalsDragEnd}
        />
      </article>
      <article>
        <h3 className="text-size14 font-medium mb-6 text-gray-500">종료된 목표</h3>
        <DragDrop
          status="DONE"
          goalList={closedGoalList}
          onGoalsDragEnd={onGoalsDragEnd}
        />
      </article>
    </>
  );
};

export default GoalDragDrop;
