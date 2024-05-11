import { useEffect } from "react";
import { FormProvider, useForm } from "react-hook-form";

import { TextInput } from "@/app/_components/client";
import type { Meta, StoryObj } from "@storybook/react";

/**
 * ## Text Input Component
 *
 * ### Props
 *
 * <br>
 *
 * 🔥 기본적인 Props는 Input Type을 상속받고 있습니다. 단, `type` `onChange` 제외
 *
 * <br>
 *
 * - **name : **ReactHooksForm Register에 전달될 name을 전달합니다.
 * - **options ? : **Register의 Options 부분과 동일하게 option을 추가할 수 있습니다.
 * - **placeholder ? : **placeholder값을 전달할 수 있습니다.
 * - **disabled ? : **disabled 비활성화 시킬 수 있습니다.
 *
 * 🔥 Storybook 에서 원활한 사용을위해 FormContext 방식을 사용하였습니다.<br>
 * ( Storybook에서는 register를 넘겨줄 수 있는 방법이 없음. )
 *
 * */
const meta = {
  title: "components/Input/TextInput",
  component: TextInput,
  parameters: {
    layout: "centered",
  },

  tags: ["autodocs"],

  argTypes: {
    name: {
      control: { disable: true },
      description: "ReactHooksForm Register에 전달될 name을 전달합니다.",
    },

    options: {
      control: { disable: true },
      description: "Register의 Options 부분과 동일하게 option을 추가할 수 있습니다.",
    },

    placeholder: {
      control: "text",
      description: "placeholder값을 전달할 수 있습니다.",
    },
    disabled: {
      control: "boolean",
      description: "disabled 비활성화 시킬 수 있습니다.",
    },
  },

  args: {
    name: "",
  },
} satisfies Meta<typeof TextInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  decorators: [
    (TextInputComponent, { args }) => {
      const form = useForm({ defaultValues: { test: "" } });

      return (
        <FormProvider {...form}>
          <TextInputComponent args={{ ...args, name: "test" }} />
        </FormProvider>
      );
    },
  ],
};

export const Error_TextInput: Story = {
  decorators: [
    (TextInputComponent) => {
      const form = useForm({ defaultValues: { test: "" } });

      useEffect(() => {
        form.setError("test", { message: "Test Error" });
      }, [form]);

      return (
        <FormProvider {...form}>
          <TextInputComponent args={{ name: "test" }} />
        </FormProvider>
      );
    },
  ],
};

export const PlaceholderTextInput: Story = {
  decorators: [
    (TextInputComponent) => {
      const form = useForm({ defaultValues: { test: "" } });

      return (
        <FormProvider {...form}>
          <TextInputComponent args={{ name: "test", placeholder: "Placeholder Text" }} />
        </FormProvider>
      );
    },
  ],
};

export const DisabledTextInput: Story = {
  decorators: [
    (TextInputComponent) => {
      const form = useForm({ defaultValues: { test: "" } });

      return (
        <FormProvider {...form}>
          <TextInputComponent args={{ name: "test", placeholder: "Disabled", disabled: true }} />
        </FormProvider>
      );
    },
  ],
};
