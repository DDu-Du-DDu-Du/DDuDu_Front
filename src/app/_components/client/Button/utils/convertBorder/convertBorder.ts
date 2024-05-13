import { ButtonBorderType } from "../../Button.type";

const convertBorder = (border: ButtonBorderType) => {
  switch (border) {
    case "green":
      return "border border-example_green_100";

    case "none":
      return "";

    default:
      return "";
  }
};

export default convertBorder;
