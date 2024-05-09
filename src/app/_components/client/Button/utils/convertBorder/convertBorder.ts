import { ButtonBorderType } from "../../Button.type";

const convertBorder = (border: ButtonBorderType) => {
  switch (border) {
    case "green":
      return "border-[0.1rem] green";

    case "none":
      return "";

    default:
      return "";
  }
};

export default convertBorder;
