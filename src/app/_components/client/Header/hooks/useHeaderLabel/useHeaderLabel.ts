import { useMemo } from "react";

interface useHeaderLabelProps {
  segments: string[];
}

const useHeaderLabel = ({ segments }: useHeaderLabelProps) => {
  return useMemo(() => {
    let headerLabel = "";

    const url = "/" + segments.join("/");

    switch (url) {
      case "/goal":
        headerLabel = "목표 관리";
        break;

      default:
        break;
    }

    return { headerLabel };
  }, [segments]);
};

export default useHeaderLabel;
