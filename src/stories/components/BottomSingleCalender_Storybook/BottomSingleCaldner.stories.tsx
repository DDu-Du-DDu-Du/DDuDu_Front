import { useState } from "react";

import { BottomSingleCalendar } from "@/app/_components/client/Calendar";
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
  title: "components/Calendar/BottomSingleCalendar",
  component: BottomSingleCalendar,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {
    selectedDate: {
      control: { type: "date", disable: true },
      description: "캘린더에서 선택한 날짜 데이터들을 담고 있는 State입니다.",
    },
    setSelected: {
      control: { disable: true },
      description: "Bottom Sheet가 오픈될지에 대한 `boolean`값을 전달받습니다.",
    },
  },
  args: {},
} satisfies Meta<typeof BottomSingleCalendar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedDate: new Date(),
    currentDate: "2024-10-01",
    setSelected: () => {},
    onChangeDDuDuDate: () => {},
    handleCalendarSheetToggleOff: () => {},
  },
  decorators: [
    (BottomMultipleCalender) => {
      const [selected, setSelected] = useState<Date>();

      const selectedHandler = (date: Date | undefined) => {
        date && setSelected(date);
      };

      return (
        <section className="px-4">
          <BottomMultipleCalender args={{ selectedDate: selected, setSelected: selectedHandler }} />
          <span>
            <p>{selected?.toString()}</p>
          </span>
        </section>
      );
    },
  ],
};
