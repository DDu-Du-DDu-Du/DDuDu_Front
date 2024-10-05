"use client";

import { useEffect } from "react";

import { GoalItem } from "@/app/_components/server";
import { GOAL_KEY } from "@/app/_constants/queryKey/queryKey";
import { getGoalList } from "@/app/_services/client/goal/goal";
import { GoalType } from "@/app/_types/response/goal/goal";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { useQuery } from "@tanstack/react-query";

import { useAnimationChecker, useDragDrop } from "./hooks";

import { useSession } from "next-auth/react";

const GoalDragDrop = () => {
  const { data: session } = useSession();
  const { data: goal, refetch } = useQuery<GoalType[]>({
    queryKey: [GOAL_KEY.GOAL_LIST],
    queryFn: () => getGoalList(session?.sessionToken as string, String(session?.user.userId)),
    enabled: !!session,
  });

  const { goalList, onDragEnd } = useDragDrop({ goal });
  const { checker } = useAnimationChecker();

  useEffect(() => {
    refetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checker || !goalList) {
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
