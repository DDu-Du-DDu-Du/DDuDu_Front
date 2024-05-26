import { FollowRequestItem } from "@/app/_components/client";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## FollowRequestItem Component
 *
 * ### Props
 * - **user :** 팔로우 요청한 유저에 대한 데이터를 전달받습니다. (userId, userName, userImage)
 * - **followRequestAt :** 팔로우를 요청한 시간 데이터가 전달됩니다.
 * - **onFollowRequestCheck :** 수락, 거절에 대한 응답 값을 props로 전달한 함수를 통해 boolean으로 전달받습니다.
 *
 * <br>
 *
 * ### FollowRequestItem 사용 방법
 *
 * ```
 * <FollowRequestItem
 *  user={{ userId: "코카콜라", userName: "코카콜라", userImage: null }}
 *  followRequestAt="2024-05-24T20:06:00Z"
 *  onFollowRequestCheck={(isFollow) => console.log(isFollow)}
 * />
 * ```
 **/

const meta = {
  title: "components/FollowRequestItem",
  component: FollowRequestItem,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },

  tags: ["autodocs"],

  argTypes: {
    user: {
      control: { type: "object" },
      of: {
        type: "object",
        shape: {
          userId: { control: "text" },
          userName: { control: "text" },
          userImage: { control: "text" },
        },
      },
      description: "userId, userName, userImage 정보를 객체로 전달받습니다.",
    },
    followRequestAt: {
      control: "text",
      description: "팔로우를 요청한 시간 데이터가 전달됩니다.",
    },
    onFollowRequestCheck: {
      control: { disable: true },
      description: "수락, 거절에 대한 응답 값을 boolean으로 전달받습니다.",
    },
  },

  args: {
    user: { userId: "코카콜라", userName: "코카콜라", userImage: null },
    followRequestAt: "2024-05-24T20:06:00Z",
    onFollowRequestCheck: () => {},
  },
} satisfies Meta<typeof FollowRequestItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
