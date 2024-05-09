import { ButtonProps } from "./Button.type";

const Button = ({ children }: ButtonProps) => {
  return <button type="button">{children}</button>;
};

export default Button;
