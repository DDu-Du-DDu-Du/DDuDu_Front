import * as S from "./TextInput.styles";
import { colors } from "@/styles";

import { HTMLAttributes } from "react";
import { FieldValues, RegisterOptions, useFormContext } from "react-hook-form";

interface TextInputProps extends Omit<HTMLAttributes<HTMLInputElement>, "type" | "onChange"> {
  name: string;
  options?: RegisterOptions<FieldValues, string>;
  placeholder?: string;
  disabled?: boolean;
}

const TextInput = ({
  name,
  options = {},
  placeholder,
  disabled = false,
  ...rest
}: TextInputProps) => {
  const { register, formState } = useFormContext();

  const hasError = !!formState.errors[name];

  return (
    <S.TextInputStyle
      type="text"
      placeholder={placeholder}
      disabled={disabled}
      $disabled={disabled}
      $hasError={hasError}
      style={{
        border: hasError ? `0.4rem double ${colors.example_red_500}` : "",
      }}
      {...rest}
      {...register(name, options)}
    />
  );
};

export default TextInput;
