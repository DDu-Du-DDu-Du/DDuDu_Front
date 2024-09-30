import { FeedCalendar } from "@/app/_components/client/Calendar";
import { GoalsType } from "@/app/_components/client/Calendar/FeedCalendar/FeedCalendar";
import type { StoryObj } from "@storybook/react";

const MONTHLY_GOALS_MOCK_DATA: GoalsType = {
  id: 5,
  contents: "9월 목표 \n- 뚜두 프로젝트 배포하기\n- MVP 완료하기",
  type: "MONTH",
};

const DAILY_DDUDU_MOCK_DATA = [
  {
    date: "2024-09-01",
    totalCount: 0,
    uncompletedCount: 0,
  },
  {
    date: "2024-09-02",
    totalCount: 0,
    uncompletedCount: 0,
  },
  {
    date: "2024-09-03",
    totalCount: 0,
    uncompletedCount: 0,
  },
  {
    date: "2024-09-04",
    totalCount: 0,
    uncompletedCount: 0,
  },
  {
    date: "2024-09-05",
    totalCount: 0,
    uncompletedCount: 0,
  },
  {
    date: "2024-09-06",
    totalCount: 1,
    uncompletedCount: 1,
  },
  {
    date: "2024-09-07",
    totalCount: 1,
    uncompletedCount: 1,
  },
  {
    date: "2024-09-08",
    totalCount: 1,
    uncompletedCount: 1,
  },
  {
    date: "2024-09-09",
    totalCount: 4,
    uncompletedCount: 4,
  },
  {
    date: "2024-09-10",
    totalCount: 5,
    uncompletedCount: 5,
  },
  {
    date: "2024-09-11",
    totalCount: 2,
    uncompletedCount: 2,
  },
  {
    date: "2024-09-12",
    totalCount: 7,
    uncompletedCount: 7,
  },
  {
    date: "2024-09-13",
    totalCount: 4,
    uncompletedCount: 4,
  },
  {
    date: "2024-09-14",
    totalCount: 1,
    uncompletedCount: 1,
  },
  {
    date: "2024-09-15",
    totalCount: 2,
    uncompletedCount: 2,
  },
  {
    date: "2024-09-16",
    totalCount: 2,
    uncompletedCount: 2,
  },
  {
    date: "2024-09-17",
    totalCount: 2,
    uncompletedCount: 2,
  },
  {
    date: "2024-09-18",
    totalCount: 2,
    uncompletedCount: 2,
  },
  {
    date: "2024-09-19",
    totalCount: 4,
    uncompletedCount: 3,
  },
  {
    date: "2024-09-20",
    totalCount: 3,
    uncompletedCount: 3,
  },
  {
    date: "2024-09-21",
    totalCount: 1,
    uncompletedCount: 1,
  },
  {
    date: "2024-09-22",
    totalCount: 4,
    uncompletedCount: 4,
  },
  {
    date: "2024-09-23",
    totalCount: 4,
    uncompletedCount: 0,
  },
  {
    date: "2024-09-24",
    totalCount: 3,
    uncompletedCount: 3,
  },
  {
    date: "2024-09-25",
    totalCount: 3,
    uncompletedCount: 0,
  },
  {
    date: "2024-09-26",
    totalCount: 4,
    uncompletedCount: 3,
  },
  {
    date: "2024-09-27",
    totalCount: 2,
    uncompletedCount: 2,
  },
  {
    date: "2024-09-28",
    totalCount: 1,
    uncompletedCount: 1,
  },
  {
    date: "2024-09-29",
    totalCount: 1,
    uncompletedCount: 1,
  },
  {
    date: "2024-09-30",
    totalCount: 2,
    uncompletedCount: 2,
  },
];

/**
 * ## MainFeedCalendar Component
 *
 * ### Props
 * - **monthlyGoals : **문자열 배열 형태로 이루어진 월간 목표 데이터를 입력받습니다.
 * - **monthlyDDuDus : **일 단위의 뚜두 달성 갯수를 담은 객체 데이터를 입력받습니다. (월별, API 연동 후 형태 수정 필요)
 *
 * */
const meta = {
  title: "components/Calendar/MainFeedCalendar",
  component: FeedCalendar,

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
  args: { monthlyGoals: MONTHLY_GOALS_MOCK_DATA, monthlyDDuDus: DAILY_DDUDU_MOCK_DATA },
  decorators: [
    () => {
      return (
        <FeedCalendar
          monthlyDDuDus={DAILY_DDUDU_MOCK_DATA}
          monthlyGoals={MONTHLY_GOALS_MOCK_DATA}
        />
      );
    },
  ],
};
