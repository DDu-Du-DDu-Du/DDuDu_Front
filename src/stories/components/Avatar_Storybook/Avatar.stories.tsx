import type { Meta, StoryObj } from "@storybook/react";

import { AvatarView } from "./components";

/**
 * ## Avatar Component
 *
 * ### Props
 * - **type : **Avatar의 종류(view, edit)를 선택합니다. (기본값은 view 입니다.)
 *   - view의 경우 Avatar를 보기 위한 용도와 유저 페이지로 이동이 필요한 경우 사용됩니다.
 *   - edit의 경우 Avatar를 수정하는 용도로 사용됩니다. (회원가입, 회원정보 변경)
 *- **size : **small(40px), medium(80px), large(100px) 정해진 사이즈로 변경할 수 있습니다.
 *- **avatarImage : **avatarImage에 보여줄 유저에 대한 이미지를 전달합니다. (avatar의 초기 이미지)
 *- **userId : **userId를 전달하면 user에 대한 페이지로 이동할 수 있는 버튼이 활성화됩니다.
 *- **onChangeAvatar : **onChangeAvatar 함수는 edit에서 사용되는 함수입니다. 변경된 이미지를 File 형태로 전달받는 이벤트 핸들러입니다.
 *
 * **type view**를 사용 할 때는 size, userId, avatarImage를 전달하여 사용할 수 있습니다.
 * ```
 * <Avatar size="small" avatarImage={defaultImage} userId="userId" />
 * ```
 *
 * **type edit**을 사용 할 때는 type을 edit으로 지정한 후 onChangeAvatar 함수를 통해 변경된 이미지 파일을 전달받을 수 있습니다.
 * ```
 * <Avatar type="edit" size="large" avatarImage={defaultImage} onChangeAvatar={(file) => console.log(file)} />
 * ```
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
      options: ["small", "medium", "large"],
      description:
        "small, medium, large를 통해 size를 전달받습니다. 해당 size는 현재 프로젝트 내 모든 avatar 사이즈를 통해 제작된 size입니다.",
    },
    avatarImage: {
      control: "text",
      description:
        "해당 user에 설정된 avatarImage가 있을 경우 avatarImage를 통해 default 값을 같습니다. 이미지를 설정하지 않은 경우 null을 전달하게 되고 이때 기본 프로필 이미지가 나타납니다.",
    },
    userId: {
      control: "text",
      description:
        "AvatarView에 userId를 전달하면 해당 유저 페이지(/user/userId)로 이동하는 style과 버튼이 생성됩니다.",
    },
    onChangeAvatar: { action: "clicked" },
  },

  args: {
    avatarImage: null,
    userId: "테스트",
  },
} satisfies Meta<typeof AvatarView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
