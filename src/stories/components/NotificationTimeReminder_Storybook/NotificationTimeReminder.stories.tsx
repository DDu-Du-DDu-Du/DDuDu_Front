import type { Meta, StoryObj } from "@storybook/react";

import { NotificationTimeReminderView } from "./components";

/**
 * ## NotificationTimeReminder Component
 *
 * ### Props
 * - **todoId :** 투두 리스트에 대한 ID 정보를 전달받습니다. 해당 ID를 통해 투두 리스트가 있는 페이지로 이동합니다.
 * - **todoTitle :** 시간 알림에 대한 투두 리스트 제목을 전달받습니다.
 * - **todoDate :** 시간 알림에 대한 투두 리스트의 날짜, 시간 데이터를 string으로 전달받습니다. (2024-05-12T23:20:00 형식)
 *
 * <br>
 *
 * ### NotificationTimeReminder 사용 방법
 *
 * ```
 * <NotificationTimeReminder todoId="1" todoTitle="제목을 입력해주세요." todoDate="2024-05-12T23:20:00" />
 * ```
 **/

const meta = {
  title: "components/NotificationTimeReminder",
  component: NotificationTimeReminderView,

  tags: ["autodocs"],

  argTypes: {
    todoId: {
      type: "string",
      description: "투두 리스트에 대한 ID 정보를 전달받습니다.",
    },
    todoTitle: {
      type: "string",
      description: "시간 알림에 대한 투두 리스트 제목을 전달받습니다.",
    },
    todoDate: {
      type: "string",
      description: "시간 알림에 대한 투두 리스트의 날짜, 시간 데이터를 string으로 전달받습니다.",
    },
  },

  args: {
    todoId: "1",
    todoTitle: "제목을 입력해주세요.",
    todoDate: "2024-05-12T23:20:00",
  },
} satisfies Meta<typeof NotificationTimeReminderView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
