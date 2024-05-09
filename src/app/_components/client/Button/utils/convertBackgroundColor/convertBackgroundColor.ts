import { ButtonBackgroundColorType } from "../../Button.type";

const convertBackgroundColor = (colorValue: ButtonBackgroundColorType) => {
  switch (colorValue) {
    case "yellow":
      return "bg-yellow-500";

    case "pink":
      return "bg-pink-500";

    case "blue":
      return "bg-blue-500";

    default:
      return "bg-yellow-500";
  }
};

export default convertBackgroundColor;
