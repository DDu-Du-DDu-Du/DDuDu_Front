import { ButtonFontColorType } from "../../Button.type";

const convertFontColor = (fontColorValue: ButtonFontColorType) => {
  switch (fontColorValue) {
    case "white":
      return "white";

    case "black":
      return "text_black_900";

    default:
      return "black";
  }
};

export default convertFontColor;
