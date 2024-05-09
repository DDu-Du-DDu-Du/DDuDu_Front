import { ButtonFontSizeType } from "../../Button.type";

const convertFontSize = (fontSizeValue: ButtonFontSizeType) => {
  switch (fontSizeValue) {
    case "0.94rem":
      return "text-[0.94rem]";

    case "0.81rem":
      return "text-[0.81rem]";

    default:
      return "text-[0.94rem]";
  }
};

export default convertFontSize;
