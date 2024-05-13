import { ButtonFontColorType } from "../../Button.type";

const convertFontColor = (fontColorValue: ButtonFontColorType) => {
  switch (fontColorValue) {
    case "black":
      return "text-black_500";

    case "white":
      return "text-white_100";

    default:
      return "text-black_500";
  }
};

export default convertFontColor;
