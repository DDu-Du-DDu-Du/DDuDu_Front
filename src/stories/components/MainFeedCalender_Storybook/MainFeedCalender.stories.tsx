import { FeedCalender } from "@/app/_components/client/Calender";
import { DAILY_DDUDU_MOCK_DATA } from "@/app/_components/client/Calender/FeedCalender/components/DailyDDuDu/DailyDDuDu.constant";
import type { StoryObj } from "@storybook/react";

/**
 * ## MainFeedCalender Component
 *
 * ### Props
 * - **monthlyGoals : **문자열 배열 형태로 이루어진 월간 목표 데이터를 입력받습니다.
 * - **monthlyDDuDus : **일 단위의 뚜두 달성 갯수를 담은 객체 데이터를 입력받습니다. (월별, API 연동 후 형태 수정 필요)
 *
 * */
const meta = {
  title: "components/Calender/MainFeedCalender",
  component: FeedCalender,
  parameters: {},

  tags: ["autodocs"],

  argTypes: {
    monthlyGoals: {
      control: { disable: true },
      description: "문자열 배열 형태로 이루어진 월간 목표 데이터를 입력받습니다.",
    },
    monthlyDDuDus: {
      control: { disable: true },
      description:
        "일 단위의 뚜두 달성 갯수를 담은 객체 데이터를 입력받습니다. (월별, API 연동 후 형태 수정 필요)",
    },
  },
  args: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { monthlyGoals: ["아침 7시 기상", "기술면접 준비"], monthlyDDuDus: DAILY_DDUDU_MOCK_DATA },
  decorators: [
    (FeedCalender) => {
      return <FeedCalender />;
    },
  ],
};
