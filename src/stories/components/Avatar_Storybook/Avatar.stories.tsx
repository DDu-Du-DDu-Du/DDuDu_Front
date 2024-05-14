import type { Meta, StoryObj } from "@storybook/react";

import { AvatarView } from "./components";

/**
 * ## Avatar Component
 *
 * ### Props
 * - **type : **Avatar의 종류(view, edit)를 선택합니다. (기본값은 view 입니다.)
 *   - view의 경우 Avatar를 보기 위한 용도와 유저 페이지로 이동이 필요한 경우 사용됩니다.
 *   - edit의 경우 Avatar를 수정하는 용도로 사용됩니다. (회원가입, 회원정보 변경)
 *- **size : **tiny(30px), small(40px), medium(80px), large(100px) 정해진 사이즈로 변경할 수 있습니다.
 *- **user : ** userId, userName, userImage 정보를 객체로 전달받습니다.
 *     - **userId : **userId를 전달하면 user에 대한 페이지로 이동할 수 있는 버튼이 활성화됩니다.
 *     - **userName : **userName은 유저의 닉네임을 나타내는 정보입니다.
 *     - **userImage : **userImage에 보여줄 유저에 대한 이미지를 전달합니다. (avatar의 초기 이미지)
 * - **users : ** user 정보를 배열로 전달받습니다. 만약 users 배열이 2개 이상 존재하면 AvatarList를 보여줍니다. AvatarList는 가장 먼저 들어온 2명의 유저 정보를 토대로 만들어집니다.
 *     - 만약 배열의 내부 요소가 0개이면 <></> 빈 값이 리턴됩니다.
 *     - 만약 배열의 내부 요소가 1개라면 한 명의 유저 정보를 아바타로 만듭니다. 단, user 정보와 users가 동시에 존재할 경우 2명 이상의 유저가 존재 시 AvatarList를 만들고 users가 1명이라면 user가 더 우선적으로 Avatar로 만들어집니다. user가 정보가 없다면 users의 정보를 토대로 Avatar가 만들어집니다.
 *- **onChangeAvatar : **onChangeAvatar 함수는 edit에서 사용되는 함수입니다. 변경된 이미지를 File 형태로 전달받는 이벤트 핸들러입니다.
 *
 * <br>
 *
 * ### Avatar 사용 방법
 * **type view**를 사용 할 때는 size, user 객체를 전달하여 사용할 수 있습니다.
 * ```
 * <Avatar size="small" user={{ userId: "테스트", userName: "닉네임", userImage: null }} />
 * ```
 *
 * **type edit**을 사용 할 때는 type을 edit으로 지정한 후 onChangeAvatar 함수를 통해 변경된 이미지 파일을 전달받을 수 있습니다.
 * ```
 * <Avatar type="edit" size="large" user={{ userId: "테스트", userName: "닉네임", userImage: null }} onChangeAvatar={(file) => console.log(file)} />
 * ```
 *
 * <br>
 *
 * ### AvatarList 사용 방법
 * users 배열 내부 user 정보가 2개 이상 전달되면 가장 먼저 들어온 2명의 유저 정보로 AvatarList가 만들어집니다.
 * AvatarList는 클릭 시 전달된 모든 유저 리스트를 확인할 수 있습니다.
 *
 * 만약 1명 이하 유저가 전달된다면 조건에 따라 다르게 Avatar로 만들어집니다.
 * - 전달된 유저가 0명이라면 빈 값을 리턴합니다. (아무것도 리턴하지 않습니다.)
 * - 전달된 유저가 1명이라면 먼저 user 정보가 있는지 확인 후 유저 정보가 없다면 해당 users 배열의 유저 정보를 토대로 Avatar를 만듭니다.
 * - 만약 user를 통해 전달받은 유저 정보도 있다면 user의 정보를 통해 Avatar 컴포넌트를 만듭니다. (즉, users 정보가 한 명이라면 user가 우선순위가 높습니다.)
 * */
const meta = {
  title: "components/Avatar",
  component: AvatarView,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },

  tags: ["autodocs"],

  argTypes: {
    type: {
      control: "inline-radio",
      options: ["view", "edit"],
      description:
        "view, edit type을 전달받습니다. view의 경우 Avatar를 보는 것과 Avatar를 통해 해당 유저 페이지로 이동하는 것이 가능합니다. edit의 경우 Avatar Image 수정이 필요한 곳에서 사용될 수 있습니다.",
    },
    size: {
      control: "inline-radio",
      options: ["tiny", "small", "medium", "large"],
      description:
        "tiny, small, medium, large를 통해 size를 전달받습니다. 해당 size는 현재 프로젝트 내 모든 avatar 사이즈를 통해 제작된 size입니다.",
    },
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
    users: {
      control: { type: "object", options: [] },
      of: {
        type: "object",
        shape: {
          userId: { control: "text" },
          userName: { control: "text" },
          userImage: { control: "text" },
        },
      },
      description:
        "user 정보를 배열로 전달받습니다. 만약 users 배열이 2개 이상 존재하면 AvatarList를 보여줍니다. AvatarList는 가장 먼저 들어온 2명의 유저 정보를 토대로 만들어집니다.",
    },
    onChangeAvatar: { action: "clicked" },
  },

  args: {
    type: "view",
    size: "small",
    user: { userId: "테스트", userName: "이름", userImage: null },
    users: [
      { userId: "테스트", userName: "이름", userImage: null },
      { userId: "테스트2", userName: "이름", userImage: null },
    ],
  },
} satisfies Meta<typeof AvatarView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
