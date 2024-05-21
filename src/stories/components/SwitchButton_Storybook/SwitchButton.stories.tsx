import { SwitchButton } from "@/app/_components/client";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## SwitchButton Component
 *
 * ### Props
 * - **firstLabel :** 첫 번째 요소의 이름을 string으로 전달받습니다. (기본값은 `투두`입니다.)
 * - **secondLabel :** 두 번째 요소의 이름을 string으로 전달받습니다. (기본값은 `스케줄`입니다.)
 * - **viewKey :** queryString의 key에 해당하는 데이터를 string으로 전달받습니다. (기본값은 `view`입니다.)
 * - **selectedOption :** 첫 번째 요소를 클릭했을 때 변경될 상태를 전달합니다. 해당 값은 queryString의 value에도 해당되는 데이터입니다. string으로 전달 받습니다. (기본값은 `ddudu`입니다.)
 * - **alternativeOption :** 두 번째 요소를 클릭했을 때 변경될 상태를 전달합니다. 해당 값은 queryString의 value에도 해당되는 데이터입니다. string으로 전달 받습니다. (기본값은 `schedule`입니다.)
 * <br>
 *
 * ### SwitchButton 사용 방법
 *  **기본값으로 사용할 경우 (투두/스케줄을 보여주며 각각의 상태는 ddudu, schedule로 정의됩니다.)**<br/>
 *  ```
 *  <SwitchButton />
 *  ```
 *
 *  <br/>

 *  **내부 데이터를 커스텀하는 경우**
 *  ```
 *  <SwitchButton firstLabel="첫번째" secondLabel="두번째" viewKey="toggle" selectedOption="one" alternativeOption="two" />
 *  ```
 * */
const meta = {
  title: "components/SwitchButton",
  component: SwitchButton,
  parameters: {
    layout: "centered",
    nextjs: {
      appDirectory: true,
    },
  },

  tags: ["autodocs"],

  argTypes: {
    firstLabel: {
      control: "text",
      description: "첫 번째 요소의 이름을 string으로 전달받습니다. (기본값은 `투두`입니다.)",
    },
    secondLabel: {
      control: "text",
      description: "두 번째 요소의 이름을 string으로 전달받습니다. (기본값은 `스케줄`입니다.)",
    },
    viewKey: {
      control: "text",
      description:
        "queryString의 key에 해당하는 데이터를 string으로 전달받습니다. (기본값은 `view`입니다.)",
    },
    selectedOption: {
      control: "text",
      description:
        "첫 번째 요소를 클릭했을 때 변경될 상태를 전달합니다. 해당 값은 queryString의 value에도 해당되는 데이터입니다. string으로 전달 받습니다. (기본값은 `ddudu`입니다.)",
    },
    alternativeOption: {
      control: "text",
      description:
        "두 번째 요소를 클릭했을 때 변경될 상태를 전달합니다. 해당 값은 queryString의 value에도 해당되는 데이터입니다. string으로 전달 받습니다. (기본값은 `schedule`입니다.)",
    },
  },
} satisfies Meta<typeof SwitchButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (Story, { args }) => {
      return (
        <div>
          <Story {...args} />
        </div>
      );
    },
  ],
};
