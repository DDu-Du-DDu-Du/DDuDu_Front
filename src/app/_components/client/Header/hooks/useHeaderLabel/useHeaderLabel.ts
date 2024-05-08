import { useMemo } from "react";

interface useHeaderLabelProps {
  segments: string[];
}

const useHeaderLabel = ({ segments }: useHeaderLabelProps) => {
  return useMemo(() => {
    let headerLabel = "";

    switch (segments[0]) {
      case "example":
        headerLabel = "example";
        break;

      default:
        break;
    }

    return { headerLabel };
  }, [segments]);
};

export default useHeaderLabel;
