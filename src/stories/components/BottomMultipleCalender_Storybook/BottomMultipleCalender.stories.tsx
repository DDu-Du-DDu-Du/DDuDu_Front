import { useState } from "react";

import { BottomMultipleCalender } from "@/app/_components/client/Calender";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## BottomMultipleCalender Component
 *
 * ### Props
 * - **selected : **캘린더에서 선택한 날짜 데이터들을 담고 있는 State입니다.
 * - **setSelected : **선택한 날짜 데이터를 상위 요소에 전달하는 Setter입니다.
 *
 * 캘린더를 사용하고자 하는 영역에서 useState를 통해 state와 setter를 연결해주세요!
 * */
const meta = {
  title: "components/Calender/BottomMultipleCalender",
  component: BottomMultipleCalender,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {
    selected: {
      control: { disable: true },
      description: "캘린더에서 선택한 날짜 데이터들을 담고 있는 State입니다.",
    },

    setSelected: {
      control: { disable: true },
      description: "선택한 날짜 데이터를 상위 요소에 전달하는 Setter입니다.",
    },
  },
  args: {},
} satisfies Meta<typeof BottomMultipleCalender>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selected: [],
    setSelected: () => {},
  },
  decorators: [
    (BottomMultipleCalender) => {
      const [selected, setSelected] = useState<Date[]>([]);

      const selectedHandler = (date: Date[] | undefined) => {
        date && setSelected(date);
      };

      return (
        <section className="px-4">
          <BottomMultipleCalender args={{ selected, setSelected: selectedHandler }} />
          <span>
            {selected.map((el, index) => (
              <p key={index}>{el.toString()}</p>
            ))}
          </span>
        </section>
      );
    },
  ],
};
