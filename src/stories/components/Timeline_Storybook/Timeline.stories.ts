import { Timeline } from "@/app/_components/server";
import { MainDailyTimeTableType } from "@/app/_types/response/feed/feed";
import type { Meta, StoryObj } from "@storybook/react";

const TIMETABLE_DDUDU_LIST: MainDailyTimeTableType = {
  timetable: [
    {
      beginAt: "12:00",
      ddudus: [
        {
          id: 283,
          name: "12시 - 13시 테스트",
          status: "UNCOMPLETED",
          goalId: 64,
          beginAt: "12:00",
          endAt: "13:00",
        },
      ],
    },
    {
      beginAt: "15:00",
      ddudus: [
        {
          id: 284,
          name: "15시 - 16시 테스트",
          status: "UNCOMPLETED",
          goalId: 66,
          beginAt: "15:00",
          endAt: "16:00",
        },
      ],
    },
    {
      beginAt: "20:00",
      ddudus: [
        {
          id: 285,
          name: "20시 - 22시 테스트",
          status: "UNCOMPLETED",
          goalId: 63,
          beginAt: "20:00",
          endAt: "22:00",
        },
      ],
    },
  ],
  unassignedDdudus: [
    {
      goal: {
        id: 64,
        name: "반복할 일",
        color: "EF8062",
      },
      ddudus: [],
    },
    {
      goal: {
        id: 66,
        name: "새로운 목표",
        color: "1D1D1B",
      },
      ddudus: [],
    },
    {
      goal: {
        id: 61,
        name: "뚜두 프로젝트 MVP 완료",
        color: "009FE3",
      },
      ddudus: [
        {
          id: 183,
          name: "MVP 기능 개발하기",
          status: "UNCOMPLETED",
        },
      ],
    },
    {
      goal: {
        id: 63,
        name: "목표",
        color: "FFF692",
      },
      ddudus: [],
    },
  ],
};

/**
 * ## Timeline Component
 *
 * ### Props
 * - **timeline : **시간별 DDuDu 조회를 통해 받은 timeline 배열을 전달받습니다. - `Type : TimelineListType`
 *
 * DDuDu 시간별 조회 API를 통해 응답받은 데이터 내부의 timeline 객체를 그대로 전달받습니다.<br>
 * <br>
 * 현재 여러 상황에 대한 데이터를 임시로 넣은 상태입니다.<br>
 *
 * ```
 * {
 *  timetable: [
 *    {
 *      beginAt: "15:00",
 *      ddudus: [
 *        {
 *          id: 284,
 *          name: "15시 - 16시 테스트",
 *          status: "UNCOMPLETED",
 *          goalId: 66,
 *          beginAt: "15:00",
 *          endAt: "16:00",
 *        },
 *       ],
 *     },
 *   ]
 * }
 * ```
 * */
const meta = {
  title: "components/Timeline",
  component: Timeline,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    selectedDDuDuDate: {
      control: "text",
      description: "선택된 날짜를 전달받습니다.",
    },
    timeline: {
      control: { disable: true },
      description:
        "시간별 DDuDu 조회를 통해 받은 timeline 배열을 전달받습니다. - `Type : TimelineListType`",
    },
  },

  args: {
    selectedDDuDuDate: "2024-09-24",
    timeline: TIMETABLE_DDUDU_LIST.timetable,
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedDDuDuDate: "2024-09-24",
    timeline: TIMETABLE_DDUDU_LIST.timetable,
  },
};
