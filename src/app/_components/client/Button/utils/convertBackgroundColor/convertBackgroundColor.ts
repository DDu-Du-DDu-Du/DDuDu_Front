import { ButtonBackgroundColorType } from "../../Button";

const convertBackgroundColor = (colorValue: ButtonBackgroundColorType) => {
  switch (colorValue) {
    case "yellow":
      return "bg-example_yellow_500";

    case "orange":
      return "bg-example_orange_500";

    case "red":
      return "bg-example_red_500";

    case "gray":
      return "bg-example_gray_500";

    default:
      return "bg-example_yellow_500";
  }
};

export default convertBackgroundColor;
