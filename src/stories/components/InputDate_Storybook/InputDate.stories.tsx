import { FormProvider, useForm } from "react-hook-form";

import { InputDate } from "@/app/_components/client";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## InputDate Component
 *
 * ### Props
 * - **type :** `single`, `range` 타입을 전달 받습니다.
 *    - **single :** 하나의 input date를 통해 날짜를 전달받습니다.
 *    - **range :** 두 개의 input date(시작 날짜 ~ 종료 날짜) 통해 날짜를 전달받습니다. 시작 날짜의 min 값은 오늘 날짜가 되며 시작 날짜는 종료 날짜보다 클 수 없고 종료 날짜는 시작 날짜보다 작을 수 없습니다.
 * - **labelStart :** 첫 번째 input에 대한 초기 데이터입니다. (placeholder 역할이라고 보면 됩니다.)
 *    - 필수로 전달 받는 데이터입니다.
 * - **nameStart :** 첫 번째 input에 대한 name 데이터입니다. 해당 데이터는 react-hook-form의 register에 전달되는 데이터입니다.
 *   - 필수로 전달 받는 데이터입니다.
 * - **labelEnd :** 두 번째 input에 대한 초기 데이터입니다. (placeholder 역할이라고 보면 됩니다.)
 *    - type range인 경우에만 필수인 데이터입니다.
 * - **nameEnd :** 두 번째 input에 대한 name 데이터입니다. 해당 데이터는 react-hook-form의 register에 전달되는 데이터입니다.
 *   - type range인 경우에만 필수인 데이터입니다.
 * <br>
 *
 * ### InputDate 사용 방법
 *  **범위 날짜(시작 ~ 종료 날짜)가 필요한 경우**
 *  ```
 *  <InputDate type="range" labelStart="시작날짜" nameStart="startDate" labelEnd="종료날짜" nameEnd="endDate">
 *  ```
 *
 *  <br>
 *
 *  **날짜 1개만 필요한 경우**<br>
 *  ```
 *  <InputDate type="single" labelStart="시작날짜" nameStart="startDate">
 *  ```
 * */
const meta = {
  title: "components/Input/InputDate",
  component: InputDate,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    type: {
      control: { type: "radio" },
      description: "single, range 타입을 전달 받아 하나 혹은 두 개의 input date를 보여줍니다.",
    },
    labelStart: {
      control: "text",
      description: "첫 번째 input의 default Value가 됩니다. (placeholder 역할을 해줍니다.)",
    },
    nameStart: {
      control: "text",
      description: "첫 번째 input의 name 데이터입니다. (react-hook-form의 register name 값입니다.)",
    },
    labelEnd: {
      control: "text",
      description: "두 번째 input의 default Value가 됩니다. (placeholder 역할을 해줍니다.)",
    },
    nameEnd: {
      control: "text",
      description: "두 번째 input의 name 데이터입니다. (react-hook-form의 register name 값입니다.)",
    },
  },
  args: {
    type: "range",
    labelStart: "시작날짜",
    nameStart: "startDate",
    labelEnd: "종료날짜",
    nameEnd: "endDate",
  },
} satisfies Meta<typeof InputDate>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story, { args }) => {
      const methods = useForm();

      return (
        <div>
          <FormProvider {...methods}>
            <Story {...args} />
          </FormProvider>
        </div>
      );
    },
  ],
};
