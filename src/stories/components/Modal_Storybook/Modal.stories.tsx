import * as S from "./ModalStory.styles";

import { Modal } from "@/components";
import { useToggle } from "@/lib/hooks";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## Modal Component
 *
 * `useToggle` hook과 함께 사용하여 Modal을 On Off할 수 있습니다.
 *
 * ### Props
 * - **children : **Modal 내부에 제공할 내용의 Component를 전달받습니다.
 * - **isToggle : **Modal이 화면에 보여질지에 대한 여부를 전달받습니다.
 *
 * - **width ? : **Modal의 기본 너비를 제공받습니다.
 * - **height ? : **Modal의 기본 높이를 제공받습니다.
 * - **backgroundColor ? : **Modal 내부의 기본 배경 색상을 전달받습니다.
 *
 * - **onAwayClick ? : **AwayClick 수행시 동작할 callback을 전달받습니다.
 *
 *
 * ```tsx
 * const { isToggle, handleToggleOn, handleToggleOff } = useToggle()
 *
 * return (
 *
 *  ...
 *  <Button onClick={handleToggleOn}>
 *    Modal 열기
 *  </Button>
 *
 *  <Modal
 *    isToggle={isToggle}
 *    width={"20rem"}
 *    height={"40rem"}
 *    backgroundColor={"white"}
 *
 *    onAwayClick={()=>{
 *
 *      // ... callback 수행 내용
 *
 *    }}
 *  >
 *   <Button onClick={handleToggleOff}>
 *     Modal 닫기
 *   </Button>
 *  </Modal>
 *
 * ...
 *
 * )
 *
 * ```
 * */
const meta = {
  title: "components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    children: {
      control: { disable: true },
      description: "Modal 내부에 제공할 내용의 Component를 전달받습니다.",
    },

    isToggle: {
      control: { disable: true },
      description: "Modal이 화면에 보여질지에 대한 여부를 전달받습니다.",
    },

    width: {
      description: "Modal의 기본 너비를 제공받습니다.",
    },

    height: {
      description: "Modal의 기본 높이를 제공받습니다.",
    },

    backgroundColor: {
      control: "color",
      description: "Modal 내부의 기본 배경 색상을 전달받습니다.",
    },

    onAwayClick: {
      control: { disable: true },
      description: "AwayClick 수행시 동작할 callback을 전달받습니다.",
    },
  },

  args: {
    isToggle: true,
    children: <></>,
    backgroundColor: "white",
  },

  decorators: [
    (ModalComponent, { args }) => {
      const { isToggle, handleToggleOn, handleToggleOff } = useToggle();
      return (
        <S.ModalTestBox>
          <S.ModalOnButton
            type="button"
            aria-label="테스트 모달 동작 버튼"
            onClick={handleToggleOn}
          >
            Modal 오픈
          </S.ModalOnButton>
          <ModalComponent
            args={{
              ...args,
              isToggle,
              onAwayClick: handleToggleOff,
              children: (
                <S.ModalInnerItem>
                  테스트용 모달입니다.
                  <S.ModalOnButton
                    type="button"
                    aria-label="테스트 모달 닫기 버튼"
                    onClick={handleToggleOff}
                  >
                    Modal 닫기
                  </S.ModalOnButton>
                </S.ModalInnerItem>
              ),
            }}
          />
        </S.ModalTestBox>
      );
    },
  ],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
