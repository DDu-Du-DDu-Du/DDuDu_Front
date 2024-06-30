import { MainGoalItemType } from "./feed.types";

export const DAILY_DDUDU_LIST: MainGoalItemType[] = [
  {
    goal: {
      id: 0,
      name: "첫 번째 목표",
      color: "#7f7f7f",
    },
    ddudus: [
      {
        id: 0,
        name: "오늘 MainFeed 페이지 작업 완료",
        status: "UNCOMPLETED",
      },
      {
        id: 1,
        name: "코딩 테스트 한 문제 풀기 !",
        status: "UNCOMPLETED",
      },
      {
        id: 2,
        name: "리액트 Deep Dive 스터디 하기",
        status: "UNCOMPLETED",
      },
      {
        id: 3,
        name: "테스트 완료",
        status: "COMPLETE",
      },
    ],
  },
  {
    goal: {
      id: 1,
      name: "두 번째 목표",
      color: "#3F51B5",
    },
    ddudus: [
      {
        id: 0,
        name: "유튜브 보기",
        status: "UNCOMPLETED",
      },
      {
        id: 1,
        name: "커피 한 잔 마시기",
        status: "COMPLETE",
      },
      {
        id: 2,
        name: "테스트 완료",
        status: "COMPLETE",
      },
    ],
  },
];

export const TIMETABLE_DDUDU_LIST = {
  timetable: [
    {
      beginAt: "14:00",
      ddudus: [
        {
          id: 0,
          name: "string",
          status: "UNCOMPLETED",
          goalId: 0,
        },
      ],
    },
  ],
  unassignedDdudus: [
    {
      goal: {
        id: 0,
        name: "첫 번째 목표",
        color: "#7f7f7f",
      },
      ddudus: [
        {
          id: 0,
          name: "오늘 MainFeed 페이지 작업 완료",
          status: "UNCOMPLETED",
        },
        {
          id: 1,
          name: "코딩 테스트 한 문제 풀기 !",
          status: "UNCOMPLETED",
        },
        {
          id: 2,
          name: "리액트 Deep Dive 스터디 하기",
          status: "UNCOMPLETED",
        },
        {
          id: 3,
          name: "테스트 완료",
          status: "COMPLETE",
        },
      ],
    },
    {
      goal: {
        id: 1,
        name: "두 번째 목표",
        color: "string",
      },
      ddudus: [
        {
          id: 0,
          name: "유튜브 보기",
          status: "UNCOMPLETED",
        },
        {
          id: 1,
          name: "커피 한 잔 마시기",
          status: "COMPLETE",
        },
        {
          id: 2,
          name: "테스트 완료",
          status: "COMPLETE",
        },
      ],
    },
  ],
};
