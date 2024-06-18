import { GoalItem } from "@/app/_components/server";
import { GoalItemProps } from "@/app/_components/server/GoalItem/GoalItem";
import type { Meta, StoryFn } from "@storybook/react";

import GoalDropDownView from "./components/GoalDropDownView";

/**
 * ## GoalItem Component
 *
 * ### Props
 * - **type?:** `management` | `statistic` 두 타입이 존재하며, 목표 관리, 목표 통계 페이지에서 사용되는 컴포넌트입니다. 페이지마다 UI가 다르며 `management` 타입은 Drag and Drop이 가능합니다. (기본 값은 `management`입니다.)
 * - **id :** 해당 목표 id를 number 타입으로 전달받습니다. 해당 id를 통해 목표 수정 혹은 목표 통계 상세 페이지로 이동합니다.
 * - **goalName :** 해당 목표를 string 타입으로 전달받습니다.
 * - **innerRef?:** react-beautiful-dnd 라이브러리의 Draggable 내부 매개변수 provided.innerRef 값을 전달받습니다. 전달받은 innerRef는 drag 될 요소에 ref 속성에 부여해주면 됩니다. (type이 `management`이면서 드래그 이벤트가 필요한 경우 props로 전달하면 됩니다.)
 * - **draggableProps?:** react-beautiful-dnd 라이브러리의 Draggable 내부 매개변수 provided.draggableProps 값을 전달받습니다. 전달받은 draggableProps는 drag 될 요소에 {...draggableProps} 속성으로 부여됩니다. (type이 `management`이면서 드래그 이벤트가 필요한 경우 props로 전달하면 됩니다.)
 * - **dragHandleProps?:** react-beautiful-dnd 라이브러리의 Draggable 내부 매개변수 provided.dragHandleProps 값을 전달받습니다. 전달받은 dragHandleProps가 부착된 곳을 그래드할 수 있으며, 다른 요소 선택 시 드래그 되지 않습니다. (type이 `management`이면서 드래그 이벤트가 필요한 경우 props로 전달하면 됩니다.)
 *
 * <br>
 *
 * ### GoalItem 사용 방법
 * Docs에서 드래그 할 시 약간 이상한 것 같아서, Default에서 확인 부탁 드립니다. (Docs의 viewport 기준이 조금 다른 것 같네요.)
 *
 * ```
 * <GoalItem
 *  type="management"
 *  id={0}
 *  goalName="목표 관리"
 *  innerRef={provided.innerRef}
 *  draggableProps={provided.draggableProps}
 *  dragHandleProps={provided.dragHandleProps}
 * />
 * ```
 **/

const meta = {
  title: "Components/GoalItem",
  component: GoalItem,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },

  tags: ["autodocs"],

  argTypes: {
    type: {
      control: "inline-radio",
      options: ["management", "statistic"],
      description: "타입에 따라 팔로잉 버튼 스타일이 변경됩니다. (탭에 따라 다릅니다.)",
    },
    id: {
      type: "number",
      description: "투두 리스트에 대한 ID 정보를 전달받습니다.",
    },
    goalName: {
      type: "string",
      description: "userId, userName, userImage 정보를 객체로 전달받습니다.",
    },
  },
} as Meta<typeof GoalItem>;

export default meta;

const Template: StoryFn<GoalItemProps> = (args) => {
  return (
    <div style={{ padding: "2rem" }}>
      <strong style={{ display: "block", marginBottom: "1rem" }}>GoalItem Component</strong>
      <GoalItem {...args} />
      <br />
      <strong style={{ display: "block", marginBottom: "1rem" }}>
        GoalItem DragAndDrop Component
      </strong>
      <GoalDropDownView />
    </div>
  );
};

export const Default = Template.bind({});
Default.args = {
  type: "statistic",
  id: 0,
  goalName: "목표 통계",
};
