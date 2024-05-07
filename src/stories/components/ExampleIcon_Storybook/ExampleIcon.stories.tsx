import ExampleIcon from "@/app/_components/server/ExampleIcon/ExampleIcon";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## Example Icon Component
 *
 * ### Props
 * - **size : **임시 Icon의 size를 전달 합니다.
 *
 * **🔥 Icon 확정 이전 사용될 임시 Icon Component입니다.**<br>
 * <br>
 * **사용 목적**<br>
 * 추후 해당 Component의 참조를 검색해 Icon 누락 부분을 파악하기 위함
 * */
const meta = {
  title: "components/ExampleIcon",
  component: ExampleIcon,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    size: {
      control: "number",
      description: "임시 Icon의 size를 전달 합니다.",
    },
  },
} satisfies Meta<typeof ExampleIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
