import { CloseIcon } from "@/app/_components/server";
import type { Meta, StoryObj } from "@storybook/react";

import IconViewer from "./IconViewer";

/**
 * ## Icon List
 *
 * ### Props
 * - **size ? : **Icon의 사이즈를 전달받습니다. - **default : 32**
 * - **fill ?: **Icon의 색상을 전달받습니다 - **default : black**
 * - **className ? : **tailwind 구문을 통해 svg 태그의 스타일을 수정할 수 있습니다.
 *
 * - **rest ? : **SVG 태그의 기본 속성을 상속받아 사용할 수 있습니다.
 *
 * 프로젝트 전반적으로 사용되는 Icon들을 한눈에 보기 쉽도록 볼 수 있는 페이지입니다.
 *
 * */
const meta = {
  title: "example/아이콘 목록",
  component: IconViewer,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    children: {
      control: { disable: true },
      description:
        "Icon을 보여주기 위해 만들어진 Component로, 프로젝트와는 무관한 Component입니다.",
    },
  },

  args: {
    children: null,
  },
} satisfies Meta<typeof IconViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Close: Story = {
  args: { children: <CloseIcon /> },
};
