import { ButtonFontSizeType } from "../../Button.type";

const convertFontSize = (fontSizeValue: ButtonFontSizeType) => {
  switch (fontSizeValue) {
    case "large":
      return "text-size15";

    case "medium":
      return "text-size13";

    default:
      return "text-size15";
  }
};

export default convertFontSize;
