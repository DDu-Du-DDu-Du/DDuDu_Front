import { Button } from "@/app/_components/client";
import { AlertModalProps } from "@/app/_components/client/AlertModal/AlertModal";
import { useToggle } from "@/app/_hooks";
import { Meta, StoryFn } from "@storybook/react";

import { AlertModalView } from "./components";

/**
 * ## AlertModal Component
 *
 * ### Props
 * - **isToggle :** Modal의 상태를 Boolean으로 전달받습니다. isToggle의 상태에 따라 true 이면 모달을 보여주고 false 이면 모달을 숨깁니다.
 * - **title :** Modal의 제목을 string으로 전달받습니다. 필수 값입니다.
 * - **message :** Modal의 내용을 string으로 전달받습니다. 선택적으로 전달할 수 있습니다.
 * - **imageUrl :** Modal에 image를 보여주고 싶은 경우 image 경로를 전달하여 Modal에 보여줄 수 있습니다. 선택적으로 전달하며 title, message 바로 아래 들어오게 됩니다.
 * - **completeText :** Modal의 `확인` 버튼이자 외부 함수에 `true boolean 값`을 전달하는 버튼 이름을 정할 수 있는 props입니다. string으로 전달받으며 아무 값도 전달되지 않는 경우 "확인"으로 보입니다.
 * - **handleToggleOff :** Modal의 확인, 취소 버튼을 누른 경우 Modal을 닫아주는 역할을 하는 핸들러입니다. isToggle의 값을 false로 변경합니다. 필수적으로 전달받아야 하는 props입니다.
 *
 *
 * <br>
 *
 * ### AlertModal 사용 방법
 * AlertModal의 경우 useToggle() hook을 통한 반환 값인 isToggle, handleToggleOff, handleToggleOn을 반드시 필요로 합니다.
 *
 * isToggle의 경우 Modal을 보여주고 숨기는 상태 역할, handleToggleOff는 isToggle을 false로 변경하는 역할, handleToggleOn은 isToggle을 true로 변경하는 역할을 합니다.
 * ```
 * const { isToggle, handleToggleOff } = useToggle();
 * <AlertModal
 *  isToggle={isToggle}
 *  title="제목입니다."
 *  handleToggleOff={handleToggleOff} />
 * ```
 * 선택적으로 message (내용), imageUrl (모달 이미지), completeText(확인 버튼 이름)을 추가적으로 지정할 수 있습니다.
 * */

const meta = {
  title: "Components/AlertModal",
  component: AlertModalView,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    isToggle: {
      control: { disable: true },
      description:
        "Modal의 상태를 나타내는 props입니다. isToggle가 true이면 Modal이 열리고 false이면 닫힙니다.",
    },
    title: {
      control: "text",
      description: "Modal의 제목을 입력할 수 있습니다.",
    },
    message: {
      control: "text",
      description: "Modal의 내용을 입력할 수 있습니다.",
    },
    imageUrl: {
      control: "text",
      description: "Modal에 image를 보여줄 수 있는 imageUrl props입니다.",
    },
    completeText: {
      control: "text",
      description: "Modal의 `확인` 버튼 명을 변경할 수 있는 props입니다. 기본값은 `확인`입니다.",
    },
    handleToggleOff: {
      action: "handleToggleOff",
      description: "Modal을 닫을 때 사용할 핸들러입니다.",
    },
  },
} as Meta<typeof AlertModalView>;

export default meta;

const Template: StoryFn<AlertModalProps> = (args) => {
  const { isToggle, handleToggleOff, handleToggleOn } = useToggle();

  return (
    <>
      <AlertModalView
        {...args}
        isToggle={isToggle}
        handleToggleOff={handleToggleOff}
      />
      <Button onClick={handleToggleOn}>Alert Modal Open</Button>
    </>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: "제목을 입력해 주세요.",
  message: "메시지를 입력해 주세요.",
  completeText: "확인",
};
