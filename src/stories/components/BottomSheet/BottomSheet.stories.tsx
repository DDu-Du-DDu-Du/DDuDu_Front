import { BottomSheet } from "@/app/_components/client";
import { BottomProvider, useBottomSheet } from "@/app/_components/client/BottomSheet";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## Bottom Sheet Component
 *
 * ### Props
 * - **children : **Bottom Sheet 내부에 전달됩니다.
 * - **isShow : **Bottom Sheet가 오픈될지에 대한 `boolean`값을 전달받습니다.
 * - **onClose : **useBottomSheet hook을 사용하는 경우 외부 상태를 변경할 수 있는 `handleCloseSheet` 메서드를 전달받습니다.
 *
 * - **defaultHeight ? : **Bottom Sheet가 나타나는 가장 중간 위치의 값을 전달받습니다. ("50rem" , px 등으로 전달 가능 ) - `default : "35dvh"`
 * - **maxHeight : **Bottom Sheet가 펼쳐질수 있는 최대 값을 전달받습니다. ("60%" , px 등으로 전달 가능 ) - `default : "80dvh"`
 *
 * ### 🔥 Storybook에서는 `viewport`값을 제대로 사용할 수 없어 BottomSheet동작이 원활하지 않습니다.
 *
 * BottomSheet를 2가지 방법으로 사용할 수 있습니다.
 * - 버튼 클릭 혹은 특정 조건을 통해 BottomSheet가 오픈되는 경우를 고려하여 `useBottomSheet` hook을 통해 제어할 수 있도록 구현하였습니다.<br>
 * hook을 이용하는 경우 onClose 속성에 `handleCloseSheet` 메서드를 isShow 속성에 `isShow`값을 전달해야합니다.
 *
 * - 항상 BottomSheet가 존재하는 경우를 고려하여 isShow값에 `true`를 전달하면 BottomSheet가 사라지지않고 존재하도록 제작하였습니다.
 * */
const meta = {
  title: "components/BottomSheet",
  component: BottomSheet,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    children: {
      control: { disable: true },
      description: "Bottom Sheet 내부에 전달됩니다.",
    },

    isShow: {
      control: { disable: true },
      description: "Bottom Sheet가 오픈될지에 대한 `boolean`값을 전달받습니다.",
    },

    onClose: {
      control: { disable: true },
      description:
        "useBottomSheet hook을 사용하는 경우 외부 상태를 변경할 수 있는 `handleCloseSheet` 메서드를 전달받습니다.",
    },

    defaultHeight: {
      control: "text",
      description:
        'Bottom Sheet가 나타나는 가장 중간 위치의 값을 전달받습니다. ("50rem" , px 등으로 전달 가능 ) - default : "35dvh"',
    },

    maxHeight: {
      control: "text",
      description:
        'Bottom Sheet가 펼쳐질수 있는 최대 값을 전달받습니다. ("60%" , px 등으로 전달 가능 ) - default : "35dvh"',
    },
  },

  args: {
    isShow: true,
    children: null,
  },
} satisfies Meta<typeof BottomSheet>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    isShow: false,
    maxHeight: "55rem",
    defaultHeight: "30rem",
  },
  decorators: [
    (BottomSheetComponent, { args }) => {
      const { isShow, handleOpenSheet, handleCloseSheet } = useBottomSheet();

      return (
        <div
          style={{
            width: "30rem",
            height: "60rem",
            position: "relative",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <button
            onClick={handleOpenSheet}
            style={{
              padding: "1rem 2rem",
              fontSize: "1.4rem",
              fontWeight: "800",
              color: "white",
              borderRadius: "10px",
              backgroundColor: "gray",
            }}
          >
            오픈
          </button>
          <BottomProvider />

          <BottomSheetComponent
            args={{
              ...args,
              onClose: handleCloseSheet,
              isShow: isShow,
            }}
          />
        </div>
      );
    },
  ],
};
