import type { Meta, StoryObj } from "@storybook/react";

import { ToastViewer } from "./components";

/**
 * ## Toast Component
 *
 * ### Props
 * - **message : **Toast 내부에 나타낼 message를 전달받습니다.
 *
 * ### Options
 * - **deleteTime ? : **Toast가 사라지는 시간을 전달 받습니다.( ms ) - **default : 3000**
 * - **type ? : **Toast에 type을 전달받아 Progress bar의 색상을 변경합니다. ( `alert` `safe` `warning` `danger` ) - **default : alert**
 *
 * 프로젝트 내부에서 Toast를 사용하고자 할때는 useToast hook을 선언하여 내부의 createToast를 호출하는 방법으로 사용할 수 있습니다.
 * ``
 * createToast( message , options )
 * `
 * */
const meta = {
  title: "components/Toast",
  component: ToastViewer,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    message: {
      control: "text",
      description: "Toast 내부에 나타낼 message를 전달받습니다.",
    },

    deleteTime: {
      control: "number",
      description: "Toast가 사라지는 시간을 전달 받습니다.( ms ) - **default : 3000**",
    },

    type: {
      control: "inline-radio",
      options: ["alert", "warning", "safe", "danger"],

      description:
        "Toast에 type을 전달받아 Progress bar의 색상을 변경합니다. ( `alert` `safe` `warning` `danger` ) - **default : alert**",
    },
  },

  args: {
    message: "토스트 동작 테스트.",
  },
} satisfies Meta<typeof ToastViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
