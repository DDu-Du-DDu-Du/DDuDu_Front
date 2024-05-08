import { useMemo } from "react";

interface useHeaderRightButtonProps {
  segments: string[];
}

const useHeaderRightButton = ({ segments }: useHeaderRightButtonProps) => {
  return useMemo(() => {
    let rightButtonIcon: JSX.Element | null = null;
    let rightButtonFn: (() => void) | undefined = undefined;

    switch (segments[0]) {
      case "example":
        rightButtonFn = () => {};
        rightButtonIcon = null;
        break;

      default:
        break;
    }

    return { rightButtonIcon, rightButtonFn };
  }, [segments]);
};

export default useHeaderRightButton;
