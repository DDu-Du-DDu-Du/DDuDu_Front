import { DragIcon, PlusIcon } from "@/app/_components/server";
import {
  DraggableProvidedDragHandleProps,
  DraggableProvidedDraggableProps,
} from "@hello-pangea/dnd";

import Link from "next/link";

interface GoalManagementProps {
  id?: number;
  color: string;
  goalName: string;
  innerRef?: (element: HTMLElement | null) => void;
  draggableProps?: DraggableProvidedDraggableProps;
  dragHandleProps?: DraggableProvidedDragHandleProps | null | undefined;
}

const GoalManagement = ({
  id,
  color,
  goalName,
  innerRef,
  draggableProps,
  dragHandleProps,
}: GoalManagementProps) => {
  const goalColor = `#${color}`;

  return (
    <div
      className="flex items-center mb-[2.8rem]"
      ref={innerRef}
      {...draggableProps}
    >
      <span
        className="mr-[1rem] py-[1rem]"
        {...dragHandleProps}
      >
        <DragIcon />
      </span>
      <Link
        className="inline-block py-[0.9rem] px-[0.9rem] bg-sub_1 rounded-radius15 select-none cursor-pointer shadow"
        href={`/goal/editor?id=${id}`}
        title="목표 수정 페이지로 이동"
        scroll={false}
      >
        <strong
          className="pr-[0.8rem]"
          style={{ color: goalColor }}
        >
          {goalName}
        </strong>
        <span className="inline-flex justify-center items-center size-[2rem] bg-white_100 rounded-circle">
          <PlusIcon size={12} />
        </span>
      </Link>
    </div>
  );
};

export default GoalManagement;
