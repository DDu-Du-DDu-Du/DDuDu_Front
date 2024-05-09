import { ButtonBorderType } from "../../Button.type";

const convertBorder = (border: ButtonBorderType) => {
  switch (border) {
    case "green":
      return "border border-green-500";

    case "none":
      return "";

    default:
      return "";
  }
};

export default convertBorder;
