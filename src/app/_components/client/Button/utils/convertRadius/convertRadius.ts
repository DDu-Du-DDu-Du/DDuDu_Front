import { ButtonRadiusType } from "../../Button.type";

const convertRadius = (radius: ButtonRadiusType) => {
  switch (radius) {
    case "0.94rem":
      return "rounded-[0.94rem]";

    case "0.625rem":
      return "rounded-[0.625rem]";

    default:
      return "rounded-[0.94rem]";
  }
};

export default convertRadius;
