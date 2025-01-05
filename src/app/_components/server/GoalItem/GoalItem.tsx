import type {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "@hello-pangea/dnd";

import { GoalCreateDDuDu, GoalManagement, GoalStatistics } from "./components";

export interface GoalItemProps {
  type?: "create" | "management" | "statistic";
  id?: number;
  color: string;
  goalName: string;
  innerRef?: (element: HTMLElement | null) => void;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
  onOpenDDuDuInput?: () => void;
}

const GoalItem = ({
  type = "management",
  id,
  color,
  goalName,
  innerRef,
  draggableProps,
  dragHandleProps,
  onOpenDDuDuInput,
}: GoalItemProps) => {
  return (
    <>
      {type === "management" && (
        <GoalManagement
          id={id}
          color={color}
          goalName={goalName}
          innerRef={innerRef}
          draggableProps={draggableProps}
          dragHandleProps={dragHandleProps}
        />
      )}
      {type === "statistic" && (
        <GoalStatistics
          id={id}
          color={color}
          goalName={goalName}
        />
      )}
      {type === "create" && (
        <GoalCreateDDuDu
          goalName={goalName}
          color={color}
          onOpenDDuDuInput={onOpenDDuDuInput}
        />
      )}
    </>
  );
};

export default GoalItem;
