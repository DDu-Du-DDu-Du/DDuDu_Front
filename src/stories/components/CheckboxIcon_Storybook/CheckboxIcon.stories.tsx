import { useState } from "react";

import { CheckboxInput } from "@/app/_components/client";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## Checkbox Input Component
 *
 *
 * ### Props
 *
 * <br>
 *
 * Input의 type을 상속 받았습니다.
 *
 * <br>
 *
 * - **type ? : **`icon` `word` 둘중 하나의 타입에 맞는 checkbox가 제공합니다. - default : `icon`
 * - **children ? : **type이 `word`인 경우 children을 통해 내부 요소를 추가할 수 있습니다.
 * - **size ? : **type이 `icon`인 경우 checkbox의 사이즈를 변경할때 사용할 수 있습니다.
 *
 * - **checked ? : **check 여부를 전달할 수 있습니다.
 * - **value ? : **type이 `word`인 경우 value를 통해 값을 이용할 수 있습니다.
 * - **disabled ? : **checkbox의 disabled 여부를 전달받습니다.
 *
 * <br>
 *
 * 기존 checkbox 용도와 check 기능을 사용해야하는 경우에 사용하는 input입니다.
 * */
const meta = {
  title: "components/Input/Checkbox",
  component: CheckboxInput,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    type: {
      control: { type: "inline-radio", options: ["icon", "word"] },
      description:
        "`icon` `word` 둘중 하나의 타입에 맞는 checkbox가 제공합니다. - default : `icon`",
    },

    children: {
      control: "text",
      description: "type이 `word`인 경우 children을 통해 내부 요소를 추가할 수 있습니다.",
    },

    size: {
      control: "number",
      description: "type이 `icon`인 경우 checkbox의 사이즈를 변경할때 사용할 수 있습니다.",
    },

    checked: {
      control: "boolean",
      description: "check 여부를 전달할 수 있습니다.",
    },

    value: {
      control: "text",
      description: "type이 `word`인 경우 value를 통해 값을 이용할 수 있습니다.",
    },

    disabled: {
      control: "boolean",
      description: "*checkbox의 disabled 여부를 전달받습니다.",
    },
  },
} satisfies Meta<typeof CheckboxInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const TypeIcon: Story = {
  decorators: [
    (CheckBoxComponent, { args }) => {
      const [isChecked, setIsChecked] = useState(false);
      return (
        <CheckBoxComponent
          args={{ ...args, checked: isChecked, onClick: () => setIsChecked((state) => !state) }}
        />
      );
    },
  ],
};

export const TypeWord: Story = {
  decorators: [
    (CheckBoxComponent) => {
      const LIST = ["월", "화", "수", "목", "금", "토", "일"];
      const [valueList, setValueList] = useState<string[]>([]);

      return (
        <ul
          style={{
            padding: "2rem",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {LIST.map((value) => (
            <CheckBoxComponent
              key={value}
              args={{
                type: "word",
                value: value,
                onChange: () => {
                  if (valueList.includes(value)) {
                    setValueList((prev) => prev.filter((item) => item !== value));
                    return;
                  }

                  setValueList((prev) => [...prev, value]);
                },
                checked: valueList.includes(value),
                children: value,
              }}
            ></CheckBoxComponent>
          ))}
        </ul>
      );
    },
  ],
};
