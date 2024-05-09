import { ButtonFontColorType } from "../../Button.type";

const convertFontColor = (fontColorValue: ButtonFontColorType) => {
  switch (fontColorValue) {
    case "white":
      return "text-white";

    case "black":
      return "text-black";

    default:
      return "text-black";
  }
};

export default convertFontColor;
