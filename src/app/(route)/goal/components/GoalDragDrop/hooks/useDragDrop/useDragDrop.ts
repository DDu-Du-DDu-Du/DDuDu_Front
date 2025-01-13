import { useEffect, useMemo, useState } from "react";

import { GoalType } from "@/app/_types/response/goal/goal";

import { DropResultType } from "../../components/DragDrop/DragDrop";

interface UseDragDropProps {
  goals?: GoalType[];
}

const useDragDrop = ({ goals }: UseDragDropProps) => {
  const { progressGoals, closedGoals } = useMemo(() => {
    const progressGoals = goals?.filter((goal) => goal.status === "IN_PROGRESS");
    const closedGoals = goals?.filter((goal) => goal.status === "DONE");

    return {
      progressGoals,
      closedGoals,
    };
  }, [goals]);

  const [progressGoalList, setProgressGoalList] = useState(progressGoals);
  const [closedGoalList, setClosedGoalList] = useState(closedGoals);

  useEffect(() => {
    setProgressGoalList(progressGoals);
    setClosedGoalList(closedGoals);
  }, [progressGoals, closedGoals]);

  const onGoalsDragEnd = ({ status, source, destination }: DropResultType) => {
    if (!destination) {
      return;
    }

    const goalList = status === "IN_PROGRESS" ? progressGoalList : closedGoalList;
    const _goalList = JSON.parse(JSON.stringify(goalList));
    const [targetGoalItem] = _goalList.splice(source.index, 1);

    _goalList.splice(destination.index, 0, targetGoalItem);

    if (status === "IN_PROGRESS") {
      setProgressGoalList(_goalList);
    } else if (status === "DONE") {
      setClosedGoalList(_goalList);
    }
  };

  return {
    progressGoalList,
    closedGoalList,
    onGoalsDragEnd,
  };
};

export default useDragDrop;
