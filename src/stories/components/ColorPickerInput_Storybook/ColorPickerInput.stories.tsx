import { ColorPickerInput } from "@/app/_components/client/ColorSheet/components";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## Color Picker Input Component
 *
 *
 * ### Props
 *
 * <br>
 *
 * Color 코드를 전달받아 선택시 해당 Color 코드를 반환하는 Radio Input입니다.
 *
 * <br>
 *
 * - **color : **색상 코드를 전달받습니다.
 * - **name : **Radio Input의 name 필드를 전달받습니다.
 * - **onClick : **`(color : string) => void` 형태의 handler를 전달받아 Click Event시 실행합니다.
 *
 * - **isChecked ? : **현재 Input이 check되었는지에대한 상태를 boolean값을 통해 전달받습니다.
 * - **disabled ? : **Input의 disabled 여부를 전달받습니다.
 *
 * <br>
 *
 * Color Sheet 내부에서 사용되고 있습니다.
 * */
const meta = {
  title: "components/Input/ColorPickerInput",
  component: ColorPickerInput,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    color: {
      control: "color",
      description: "생상 코드를 전달받습니다.",
    },

    name: {
      control: "text",
      description: "Radio Input의 name 필드를 전달받습니다.",
    },

    onClick: {
      control: { disable: true },
      description: "`(color : string) => void` 형태의 handler를 전달받아 Click Event시 실행합니다.",
    },

    isChecked: {
      control: "boolean",
      description: "현재 Input이 check되었는지에대한 상태를 boolean값을 통해 전달받습니다.",
    },

    disabled: {
      control: "boolean",
      description: "Input의 disabled 여부를 전달받습니다.",
    },
  },

  args: {
    color: "#000",
    name: "storybook",
    onClick: () => {},
  },
} satisfies Meta<typeof ColorPickerInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
