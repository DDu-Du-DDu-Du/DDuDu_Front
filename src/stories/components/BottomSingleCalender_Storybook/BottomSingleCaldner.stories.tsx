import { useState } from "react";

import { BottomSingleCalender } from "@/app/_components/client/Calender";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## BottomMultipleCalender Component
 *
 * ### Props
 * - **selected : **Bottom Sheet 내부에 전달됩니다.
 * - **setSelected : **Bottom Sheet가 오픈될지에 대한 `boolean`값을 전달받습니다.
 *
 * 캘린더를 사용하고자 하는 영역에서 useState를 통해 state와 setter를 연결해주세요!
 * */
const meta = {
  title: "components/Calender/BottomSingleCalender",
  component: BottomSingleCalender,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {
    selected: {
      control: { disable: true },
      description: "캘린더에서 선택한 날짜 데이터들을 담고 있는 State입니다.",
    },

    setSelected: {
      control: { disable: true },
      description: "Bottom Sheet가 오픈될지에 대한 `boolean`값을 전달받습니다.",
    },
  },
  args: {},
} satisfies Meta<typeof BottomSingleCalender>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: new Date(),
    setSelected: () => {},
  },
  decorators: [
    (BottomMultipleCalender) => {
      const [selected, setSelected] = useState<Date>();

      const selectedHandler = (date: Date | undefined) => {
        date && setSelected(date);
      };

      return (
        <section className="px-4">
          <BottomMultipleCalender args={{ selected, setSelected: selectedHandler }} />
          <span>
            <p>{selected?.toString()}</p>
          </span>
        </section>
      );
    },
  ],
};
