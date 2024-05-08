import type { Meta, StoryObj } from "@storybook/react";

import { AvatarListView } from "./components";

/**
 * ## AvatarList Component
 *
 * ### Props
 * - **id :** user에 대한 id를 전달 받습니다. string 또는 null 값이 들어옵니다. 만약 id 값이 없다면 해당 유저 페이지로의 이동이 제한됩니다.
 * - **name :** user에 대한 닉네임을 전달 받습니다. 해당 데이터는 image alt 속성에 들어갑니다.
 * - **avatarImage :** avatarImage에 보여줄 유저에 대한 이미지를 전달합니다. (avatar의 초기 이미지)
 *
 * ### 사용법
 * avatars 데이터에 유저 리스트를 { id: string, name: string, avatarImage: string | null } 가 담긴 배열 리스트로 전달합니다.
 *
 * ```
 * const avatarList = [{ id: "1", name: "테스트1" , avatarImage: null }, { id: "2", name: "테스트2" , avatarImage: null }]
 *
 * <AvatarList avatars={avatarList} />
 * ```
 * */

const meta = {
  title: "components/AvatarList",
  component: AvatarListView,
  parameters: {
    nextjs: {
      appDirectory: true,
    },
  },

  tags: ["autodocs"],

  argTypes: {
    avatars: {
      control: "object",
      description: "id, name, avatarImage 객체를 배열로 전달 받습니다.",
    },
  },

  args: {
    avatars: [
      {
        id: "0",
        name: "테스트0",
        avatarImage:
          "https://mblogthumb-phinf.pstatic.net/MjAxODAyMDFfNTIg/MDAxNTE3NDYzMjU2NzIw.Y-uLAeUEcPrBlxBoL2WqGPnq-cUPNVlG6Q5n5kzLItIg.KLhISVik990xibWZpUiudOcBAeQRXZnvQcX88FQkZJMg.PNG.croseestudio/%EC%95%84%EA%B5%AC%EB%AA%AC.png?type=w800",
      },
      {
        id: "1",
        name: "테스트1",
        avatarImage: "https://cdn.gameple.co.kr/news/photo/202001/152028_156293_1129.jpg",
      },
      {
        id: "2",
        name: "테스트2",
        avatarImage: null,
      },
    ],
  },
} satisfies Meta<typeof AvatarListView>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
