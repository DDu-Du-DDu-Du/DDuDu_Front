import { SheetButton } from "@/app/_components/client";
import ExampleIcon from "@/app/_components/server/ExampleIcon/ExampleIcon";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## Sheet Button Component
 *
 * ### Props
 * - **buttonType ? : **`large` `small` 둘중 하나의 타입에 맞는 button을 제공합니다. - default : `large`
 * - **title : **Button 내부에 보여질 제목을 전달받습니다.
 * - **Icon : **Button 내부에 보여질 Icon Component를 전달받습니다. ( 🔥 size 32px 지정하기 )
 *
 * - **rightPlace ? : **`small` 타입의 Button인 경우 오른쪽 빈 공간에 제공할 ReactNode를 전달받을 수 있습니다.
 * - **disabled ? : **Button을 비활성화 합니다.
 * - **className ? : **Tailwind 구문을 이용하여 버튼을 스타일링합니다.
 *
 * - **...rest ? : **Button의 기본 Attributes를 사용할 수 있습니다.
 *
 *
 * 🔥 BottomSheet 내부에서 사용되어지는 Button입니다.
 * */
const meta = {
  title: "components/SheetButton",
  component: SheetButton,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    buttonType: {
      control: { type: "inline-radio", options: ["large", "small"] },
      description:
        "`large` `small` 둘중 하나의 타입에 맞는 button을 제공합니다. - default : `large`",
    },

    title: {
      control: "text",
      description: "Button 내부에 보여질 제목을 전달받습니다.",
    },

    Icon: {
      control: { disable: true },
      description: "Button 내부에 보여질 Icon Component를 전달받습니다. ( 🔥 size 32px 지정하기 )",
    },

    rightPlace: {
      control: { disable: true },
      description:
        "`small` 타입의 Button인 경우 오른쪽 빈 공간에 제공할 ReactNode를 전달받을 수 있습니다.",
    },

    className: {
      control: "text",
      description: "Tailwind 구문을 이용하여 버튼을 스타일링합니다.",
    },
  },

  args: {
    title: "버튼 제목입니다.",
    Icon: <ExampleIcon />,
  },

  decorators: [
    (SheetButtonComponent, { args }) => {
      return (
        <div
          style={{
            width: "32rem",
            height: "10rem",
            padding: "1rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "1rem",
            border: "1px solid gray",
          }}
        >
          <SheetButtonComponent args={args} />
        </div>
      );
    },
  ],
} satisfies Meta<typeof SheetButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TypeLarge: Story = {
  args: {
    buttonType: "large",
  },
};

export const TypeSmall: Story = {
  args: {
    buttonType: "small",
  },
};

export const TypeLargeDisabled: Story = {
  args: {
    buttonType: "large",
    disabled: true,
  },
};

export const TypeSmallDisabled: Story = {
  args: {
    buttonType: "small",
    disabled: true,
  },
};
