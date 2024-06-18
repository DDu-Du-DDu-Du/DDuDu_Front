import type {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "@hello-pangea/dnd";

import { GoalManagement, GoalStatistics } from "./components";

export interface GoalItemProps {
  type?: "management" | "statistic";
  id: number;
  goalName: string;
  innerRef?: (element: HTMLElement | null) => void;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
}

const GoalItem = ({
  type = "management",
  id,
  goalName,
  innerRef,
  draggableProps,
  dragHandleProps,
}: GoalItemProps) => {
  return (
    <>
      {type === "management" && (
        <GoalManagement
          id={id}
          goalName={goalName}
          innerRef={innerRef}
          draggableProps={draggableProps}
          dragHandleProps={dragHandleProps}
        />
      )}
      {type === "statistic" && (
        <GoalStatistics
          id={id}
          goalName={goalName}
        />
      )}
    </>
  );
};

export default GoalItem;
