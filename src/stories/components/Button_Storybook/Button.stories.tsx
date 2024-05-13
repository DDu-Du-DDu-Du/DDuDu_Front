import { Button } from "@/app/_components/client";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## Bottom Sheet Component
 *
 * ### Props
 * - **children: ** 버튼 내부에 표시될 요소들입니다.
 * - **className?: **추가적인 CSS 스타일을 적용하기 위한 클래스명입니다. tailwind를 이용합니다.
 * - **onClick?: ** 사용자가 버튼을 클릭했을 때 실행될 함수입니다. ( e.preventDefault() 동작 ) \- type : `() => void`
 *
 * - **radius?: ** 버튼의 radius값입니다. `basic` `decreased` \- **default : `basic`**
 * - **border?: ** 버튼의 border 사용 여부, 색상입니다. `green` `none` \- **default : `none`**
 *
 * - **fontSize?: ** 버튼의 내부 텍스트 크기입니다. `0.94rem` `0.81rem` \- **default : `0.94rem`**
 * - **fontWeight?: ** 버튼의 내부 텍스트 두께입니다. `regular` `bold` \- **default : `bold`**
 * - **fontColor?: ** 버튼의 내부 텍스트 색상입니다. `white` `black` \- **default : `black`**
 *
 * - **backgroundColor?: ** 버튼의 배경색입니다. `yellow` `orange` `red` \- **default : `yellow`**
 * - **shadow?: ** 버튼의 그림자 사용 여부입니다. `true` `false` \- **default : `false`**
 * - **disabled ? : ** 버튼의 disabled 사용 여부입니다. `true` `false` \- **default : `false`**
 * */

const meta = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    children: {
      description: "버튼 내부에 표시될 요소들입니다.",
    },
    radius: {
      control: "inline-radio",
      options: ["basic", "decreased"],
      description: "버튼의 radius값입니다.",
    },
    border: {
      control: "inline-radio",
      options: ["green", "none"],
      description: "버튼의 border 사용 여부, 색상입니다.",
    },
    fontSize: {
      control: "inline-radio",
      options: ["0.94rem", "0.81rem"],
      description: "버튼의 내부 텍스트 크기입니다.",
    },
    fontWeight: {
      control: "inline-radio",
      options: ["regular", "bold"],
      description: "버튼의 내부 텍스트 두께입니다.",
    },
    fontColor: {
      control: "inline-radio",
      options: ["white", "black"],
      description: "버튼의 내부 텍스트 색상입니다.",
    },
    backgroundColor: {
      control: "inline-radio",
      options: ["yellow", "orange", "red"],
      description: "버튼의 배경색입니다.",
    },
    shadow: {
      control: "boolean",
      description: "버튼의 그림자 사용 여부입니다.",
    },
    disabled: {
      control: "boolean",
      description: "버튼의 disabled 사용 여부입니다.",
    },
  },

  args: {
    children: "테스트 버튼입니당 🐥",
    className: "h-[3.5rem] w-[20rem]",
  },

  decorators: [
    (ButtonComponent) => (
      <div
        style={{
          width: "30rem",
          height: "13.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ButtonComponent />
      </div>
    ),
  ],
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BasicButton: Story = {};

export const Test1: Story = {
  args: {
    radius: "decreased",
    border: "green",
    fontSize: "0.81rem",
    fontWeight: "regular",
    backgroundColor: "orange",
  },
};

export const Test2: Story = {
  args: {
    className: "w-full h-[6rem]",
    fontColor: "white",
    backgroundColor: "red",
    shadow: true,
  },
};

export const DisabledButton: Story = {
  args: {
    disabled: true,
  },
};
