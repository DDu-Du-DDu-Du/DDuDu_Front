"use client";

import { GoalItem } from "@/app/_components/server";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";

import { useAnimationChecker, useDragDrop } from "./hooks";

const GoalDragDrop = () => {
  const { goalList, onDragEnd } = useDragDrop();
  const { checker } = useAnimationChecker();

  if (!checker) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {goalList.map(({ id, name }, index) => (
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

export default GoalDragDrop;
