import type { Meta, StoryObj } from "@storybook/react";

import { GoalTodoListItemView } from "./components";

/**
 * ## GoalTodoListItem Component
 *
 * ### Props
 * - **title :** 목표 등록에 대한 뚜두 반복 리스트 제목을 string 형태로 전달받습니다.
 * - **repeatDays :** 해당 기간 동안의 반복할 요일을 전달 받습니다. 반복 생성 시 (매일, 매주, 매월)을 통해 반복할 날짜를 선택하고 해당 날짜에 대한 데이터를 string 형태로 전달받습니다. (초기 데이터가 배열이라면 join 메서드를 통해 변환 후 전달해 주세요.)
 * - **startDate :** 뚜두 리스트를 언제 시작할지에 대한 날짜 데이터를 ISO 형식으로 전달받습니다. (API 데이터를 꺼낸 string 데이터 결과를 그대로 전달하면 됩니다.)
 * - **startDate :** 뚜두 리스트를 언제 종료할지에 대한 날짜 데이터를 ISO 형식으로 전달받습니다. (API 데이터를 꺼낸 string 데이터 결과를 그대로 전달하면 됩니다.)
 *
 * <br>
 *
 * ### GoalTodoListItem 사용 방법
 *
 * ```
 * <GoalTodoListItem title="제목" repeatDays="반복 날짜" startDate="2024-05-10" endDate="2024-05-13" />
 * ```
 **/

const meta = {
  title: "components/GoalTodoListItem",
  component: GoalTodoListItemView,

  tags: ["autodocs"],

  argTypes: {
    title: {
      type: "string",
      description: "GoalTodoListItem에 대한 제목을 string 형태로 전달받습니다.",
    },
    repeatDays: {
      type: "string",
      description:
        "GoalTodoListItem을 반복할 날짜를 선택한 결과를 string 형태로 전달받습니다. (초기 데이터가 배열이라면 join 메서드를 통해 변환 후 전달해 주세요.)",
    },
    startDate: {
      type: "string",
      description:
        "GoalTodoListItem을 시작할 날짜를 전달받습니다. (ISO 형태의 Date 객체를 API에서 반환받은 string 형태 그대로 전달해 주세요.)",
    },
    endDate: {
      type: "string",
      description:
        "GoalTodoListItem을 종료할 날짜를 전달받습니다. (ISO 형태의 Date 객체를 API에서 반환받은 string 형태 그대로 전달해 주세요.)",
    },
  },

  args: {
    title: "제목을 입력해주세요.",
    repeatDays: "월 화 수 목 금 토",
    startDate: "2024-05-01",
    endDate: "2024-05-10",
  },
} satisfies Meta<typeof GoalTodoListItemView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
