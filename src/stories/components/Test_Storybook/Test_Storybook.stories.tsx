import { StorybookTestComponent } from "@/app/_components";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## 이름 Component
 *
 * ### Props
 * - **Props이름 : **Props 설명 작성
 * - **className ? : **tailwind 구문을 통해 스타일을 수정할 수 있습니다.
 *
 * 추가적인 설명 작성 란
 * */
const meta = {
  title: "example/Test",
  component: StorybookTestComponent,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    className: {
      control: "text",
      description: "tailwind 구문을 통해 스타일을 수정할 수 있습니다. ",
    },
  },

  args: {
    className: "",
  },
} satisfies Meta<typeof StorybookTestComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
