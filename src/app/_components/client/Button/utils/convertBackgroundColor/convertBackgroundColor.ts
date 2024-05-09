import { ButtonBackgroundColorType } from "../../Button.type";

const convertBackgroundColor = (colorValue: ButtonBackgroundColorType) => {
  switch (colorValue) {
    case "pink":
      return "pink";

    case "blue":
      return "blue";

    case "yellow":
      return "yellow";

    default:
      return "yellow";
  }
};

export default convertBackgroundColor;
