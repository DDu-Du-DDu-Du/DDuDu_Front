import { GoalItem } from "@/app/_components/server";
import { GoalType } from "@/app/_types/response/goal/goal";
import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";

export type DropResultType = Pick<DropResult, "source" | "destination"> & {
  status: "IN_PROGRESS" | "DONE";
};

interface DragDropProps {
  status: "IN_PROGRESS" | "DONE";
  goalList: GoalType[];
  onGoalsDragEnd: ({ status, source, destination }: DropResultType) => void;
}

const DragDrop = ({ status, goalList, onGoalsDragEnd }: DragDropProps) => {
  return (
    <DragDropContext
      onDragEnd={({ source, destination }) => onGoalsDragEnd({ status, source, destination })}
    >
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {goalList.map(({ id, name, color }, index) => (
              <Draggable
                key={String(id)}
                draggableId={String(id)}
                index={index}
              >
                {(provided) => (
                  <GoalItem
                    innerRef={provided.innerRef}
                    draggableProps={provided.draggableProps}
                    dragHandleProps={provided.dragHandleProps}
                    goalName={name}
                    id={id}
                    color={color}
                  />
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDrop;
