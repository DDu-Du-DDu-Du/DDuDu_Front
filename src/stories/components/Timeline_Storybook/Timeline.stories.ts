import { Timeline } from "@/app/_components/server";
import { TimelineListType } from "@/app/_types/response";
import type { Meta, StoryObj } from "@storybook/react";

const TEST_VALUE: TimelineListType = {
  timeline: [
    {
      time: "12 :00",
      ddudus: [
        {
          id: 1,
          name: "테스트용 할일 목록 1",
          status: "COMPLETED",
          beginAt: "13:20:00",
          endAt: "16:20:00",
          goalId: 1001,
        },
        {
          id: 2,
          name: "테스트용 할일 2",
          status: "UNCOMPLETED",
          beginAt: "13:20:00",
          endAt: "14:20:00",
          goalId: 1001,
        },
        {
          id: 3,
          name: "테스트용 할일 목록 3 테스트용 할일 목록 3 테스트용 할일 목록 3 테스트용 할일 목록 3",
          status: "COMPLETED",
          beginAt: "13:20:00",
          endAt: "13:50:00",
          goalId: 1001,
        },
        {
          id: 4,
          name: "",
          status: "COMPLETED",
          beginAt: "13:20:00",
          endAt: "13:55:00",
          goalId: 1001,
        },
      ],
    },
    {
      time: "13 :00",
      ddudus: [
        {
          id: 5,
          name: "전부다 할일을 안했다면? 1",
          status: "UNCOMPLETED",
          beginAt: "13:20:00",
          endAt: "16:20:00",
          goalId: 1001,
        },
        {
          id: 6,
          name: "전부다 할일을 안했다면? 2",
          status: "UNCOMPLETED",
          beginAt: "13:20:00",
          endAt: "14:20:00",
          goalId: 1001,
        },
        {
          id: 7,
          name: "전부다 할일을 안했다면? 3",
          status: "UNCOMPLETED",
          beginAt: "13:20:00",
          endAt: "13:50:00",
          goalId: 1001,
        },
      ],
    },
    {
      time: "14 :00",
      ddudus: [
        {
          id: 8,
          name: "하나의 아이템 - 완료",
          status: "COMPLETED",
          beginAt: "13:20:00",
          endAt: "16:20:00",
          goalId: 1001,
        },
      ],
    },
    {
      time: "15 :00",
      ddudus: [
        {
          id: 9,
          name: "할일을 전부 완료했다면? 1",
          status: "COMPLETED",
          beginAt: "13:20:00",
          endAt: "16:20:00",
          goalId: 1001,
        },
        {
          id: 10,
          name: "할일을 전부 완료했다면? 2 할일을 전부 완료했다면? 2 할일을 전부 완료했다면? 2 할일을 전부 완료했다면? 2 할일을 전부 완료했다면? 2 할일을 전부 완료했다면? 2",
          status: "COMPLETED",
          beginAt: "13:20:00",
          endAt: "14:20:00",
          goalId: 1001,
        },
        {
          id: 11,
          name: "할일을 전부 완료했다면? 3",
          status: "COMPLETED",
          beginAt: "13:20:00",
          endAt: "13:50:00",
          goalId: 1001,
        },
      ],
    },
    {
      time: "16 :00",
      ddudus: [],
    },
    {
      time: "17 :00",
      ddudus: [
        {
          id: 12,
          name: "하나의 아이템 - 미완료",
          status: "UNCOMPLETED",
          beginAt: "13:20:00",
          endAt: "16:20:00",
          goalId: 1001,
        },
      ],
    },
    {
      time: "18:00",
      ddudus: [],
    },
    {
      time: "19:00",
      ddudus: [],
    },
    {
      time: "20:00",
      ddudus: [],
    },
    {
      time: "21:00",
      ddudus: [],
    },
    {
      time: "22:00",
      ddudus: [],
    },
    {
      time: "23:00",
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
 *  timeline: [
 *    {
 *      time: "15 :00",
 *      ddudus: [
 *        {
 *          id: 9,
 *          name: "할일을 전부 완료했다면? 1",
 *          status: "COMPLETED",
 *          beginAt: "13:20:00",
 *          endAt: "16:20:00",
 *          goalId: 1001,
 *        },
 *        {
 *          id: 10,
 *          name: "할일을 전부 완료했다면? 2",
 *          status: "COMPLETED",
 *          beginAt: "13:20:00",
 *          endAt: "14:20:00",
 *          goalId: 1001,
 *        },
 *        {
 *          id: 11,
 *          name: "할일을 전부 완료했다면? 3",
 *          status: "COMPLETED",
 *          beginAt: "13:20:00",
 *          endAt: "13:50:00",
 *          goalId: 1001,
 *        },
 *      ],
 *    },
 *  ]
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
    timeline: {
      control: { disable: true },
      description:
        "시간별 DDuDu 조회를 통해 받은 timeline 배열을 전달받습니다. - `Type : TimelineListType`",
    },
  },

  args: {
    timeline: TEST_VALUE.timeline,
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
