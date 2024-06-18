import { useEffect, useState } from "react";

import { GoalItem } from "@/app/_components/server";
import { DragDropContext, Draggable, DropResult, Droppable } from "@hello-pangea/dnd";

const GOAL_DUMMY_DATA = [
  {
    id: 0,
    name: "테스트1",
    status: "DONE",
    color: "#000000",
  },
  {
    id: 1,
    name: "테스트2",
    status: "DONE",
    color: "#000000",
  },
  {
    id: 2,
    name: "테스트3",
    status: "DONE",
    color: "#000000",
  },
  {
    id: 3,
    name: "테스트4",
    status: "DONE",
    color: "#000000",
  },
  {
    id: 4,
    name: "테스트5",
    status: "DONE",
    color: "#000000",
  },
];

const GoalDropDownView = () => {
  const [items, setItems] = useState(GOAL_DUMMY_DATA);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setEnabled(true));

    return () => {
      cancelAnimationFrame(animation);
      setEnabled(false);
    };
  }, []);

  if (!enabled) {
    return null;
  }

  const onDragEnd = ({ source, destination }: DropResult) => {
    if (!destination) {
      return;
    }

    const _items = JSON.parse(JSON.stringify(items));
    const [targetItem] = _items.splice(source.index, 1);

    _items.splice(destination.index, 0, targetItem);

    setItems(_items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {items.map(({ id, name }, index) => (
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

export default GoalDropDownView;
