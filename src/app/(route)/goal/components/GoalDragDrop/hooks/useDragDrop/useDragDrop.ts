import { useState } from "react";

import { GoalType } from "@/app/_types/response/goal/goal";
import { DropResult } from "@hello-pangea/dnd";

interface UseDragDropProps {
  goal?: GoalType[];
}

const useDragDrop = ({ goal }: UseDragDropProps) => {
  const [goalList, setGoalList] = useState(goal || []);

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    const _goalList = JSON.parse(JSON.stringify(goalList));
    const [targetGoalItem] = _goalList.splice(source.index, 1);

    _goalList.splice(destination.index, 0, targetGoalItem);

    setGoalList(_goalList);
  };

  return {
    goalList,
    onDragEnd,
  };
};

export default useDragDrop;
