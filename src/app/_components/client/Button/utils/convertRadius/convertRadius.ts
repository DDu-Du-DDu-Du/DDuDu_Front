import { ButtonRadiusType } from "../../Button.type";

const convertRadius = (radius: ButtonRadiusType) => {
  switch (radius) {
    case "basic":
      return "rounded-radius15";

    case "decreased":
      return "rounded-radius10";

    default:
      return "rounded-radius15";
  }
};

export default convertRadius;
