import { useState } from "react";

import { GOAL_DUMMY_DATA } from "@/app/(route)/goal/goal.constants";
import { DropResult } from "@hello-pangea/dnd";

const useDragDrop = () => {
  const [goalList, setGoalList] = useState(GOAL_DUMMY_DATA);

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
