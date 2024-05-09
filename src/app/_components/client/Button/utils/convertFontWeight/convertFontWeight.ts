import { ButtonFontWeightType } from "../../Button.type";

const convertFontWeight = (fontWeightValue: ButtonFontWeightType) => {
  switch (fontWeightValue) {
    case "regular":
      return "font-normal";

    case "bold":
      return "font-bold";

    default:
      return "font-bold";
  }
};

export default convertFontWeight;
