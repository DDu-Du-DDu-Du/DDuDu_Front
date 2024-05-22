import { MonthlyGoal } from "@/app/_components/client";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## Monthly Goal Component
 *
 * ### Props
 * - **value: ** 월 별 목표 내부에 적힐 내용입니다. `string`
 * - **onChange: ** 월 별 목표 내부 값이 바뀌면 호출되는 함수입니다. `(value: string) => void`
 * - **onBlur?: ** MonthlyGoal 컴포넌트 외의 영역을 클릭하면 호출되어 값을 저장합니다. `() => void`
 *
 * **🔥 MonthlyGoal 컴포넌트를 클릭하면, 그 외 영역은 오버레이 처리됩니다.**
 */

const meta = {
  title: "components/MonthlyGoal",
  component: MonthlyGoal,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    value: {
      control: "text",
      description: "월 별 목표 내부에 적힐 내용입니다.",
    },
    onChange: {
      control: { disable: true },
      description: "월 별 목표 내부 값이 바뀌면 호출되는 함수입니다.",
    },
    onBlur: {
      control: { disable: true },
      description: "MonthlyGoal 컴포넌트 외의 영역을 클릭하면 호출되어 값을 저장합니다.",
    },
  },

  args: {
    value: "",
  },
} satisfies Meta<typeof MonthlyGoal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    value: "",
    onChange: (value: string) => console.log(value),
  },
};

export const Test1: Story = {
  args: {
    value: "밀린 투두 10회 미만으로 가지기",
    onChange: (value: string) => console.log(value),
  },
};
