"use client";

import { ToastType } from "../../../../ToastProvider.type";

interface UseToastTypeColorProps {
  type: ToastType;
}

const useToastTypeColor = ({ type }: UseToastTypeColorProps) => {
  /*
    TODO
    추후 정해지는 Color에 맞도록 변수 적용하기
   */
  switch (type) {
    case "alert":
      return "bg-example_orange_500";

    case "safe":
      return "bg-example_green_100";

    case "warning":
      return "bg-example_yellow_500";

    case "danger":
      return "bg-example_red_500";

    default:
      return "bg-example_orange_500";
  }
};

export default useToastTypeColor;
