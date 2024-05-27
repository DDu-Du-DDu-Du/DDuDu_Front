import { UserListItem } from "@/app/_components/client";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## UserListItem Component
 * - 유저 Avatar 클릭 시 해당 유저 페이지로 이동합니다.
 * - 팔로우 버튼 액션은 세 가지가 존재합니다.
 *   - **팔로우:** 아직 팔로우 하지 않은 경우 (공개/비공개 동일)
 *   - **팔로잉:** 이미 팔로우중일 때 (공개/비공개 동일)
 *   - **요청중:** 비공개 계정을 팔로우 시 (비공개만)
 *
 * <br>
 *
 * ### Props
 * - **type :** type에 따라 팔로잉 버튼의 스타일이 달라집니다. type은 `follow`와 `following`이 있습니다.
 * - **user :** 회원 검색된 유저에 대한 유저 정보를 user 객체로 전달받습니다. (userId, userName, userImage)
 *  - user 정보 타입이 정해지면 변경될 임시 user 데이터입니다.
 * - **isFollowing :** 회원을 팔로우 했는지 여부를 알 수 있는 boolean 값입니다.
 * - **isPrivate :** 회원이 비공개 계정인지 알 수 있는 boolean 값입니다.
 *  - **공개:** 팔로우 시 즉시 팔로우 되며 팔로우 취소 시 즉시 취소됩니다.
 *  - **비공개:** 팔로우 시 팔로우 요청되며 회원이 요청을 수락해야 팔로우가 됩니다. 요청 중일 때 팔로우 취소를 하려고 하면 ConfirmModal을 통해 재확인합니다. 만약 비공개 계정을 이미 팔로우 중이라면 즉시 취소가 가능합니다.
 *
 * <br>
 *
 * ### UserListItem 사용 방법
 *
 * ```
 * <UserListItem
 *  type="follow"
 *  user={{ userId: "코카콜라", userName: "코카콜라", userImage: null }}
 *  isFollowing={true}
 *  isPrivate={true}
 * />
 * ```
 **/

const meta = {
  title: "components/UserListItem",
  component: UserListItem,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },
  tags: ["autodocs"],

  argTypes: {
    type: {
      control: "inline-radio",
      options: ["follow", "following"],
      description: "타입에 따라 팔로잉 버튼 스타일이 변경됩니다. (탭에 따라 다릅니다.)",
    },
    user: {
      type: "string",
      description: "검색된 유저에 대한 데이터를 전달받습니다.",
    },
    isFollowing: {
      control: "boolean",
      description: "해당 유저를 팔로우 했는지를 알려주는 값입니다.",
    },
    isPrivate: {
      control: "boolean",
      description: "해당 유저가 비공개 계정인지 알려주는 값입니다.",
    },
  },

  args: {
    type: "follow",
    user: { userId: "코카콜라", userName: "코카콜라", userImage: null },
    isFollowing: true,
    isPrivate: true,
  },
} satisfies Meta<typeof UserListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
