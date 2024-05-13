import { ButtonBackgroundColorType } from "../../Button.type";

const convertBackgroundColor = (colorValue: ButtonBackgroundColorType) => {
  switch (colorValue) {
    case "yellow":
      return "bg-example_yellow_500";

    case "orange":
      return "bg-example_orange_500";

    case "red":
      return "bg-example_red_500";

    default:
      return "bg-example_yellow_500";
  }
};

export default convertBackgroundColor;
