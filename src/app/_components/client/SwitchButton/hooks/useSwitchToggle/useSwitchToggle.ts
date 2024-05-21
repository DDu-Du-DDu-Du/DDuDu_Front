import { useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

type UseSwitchButtonState<T extends string> = {
  viewKey: string;
  selectedOption: T;
  alternativeOption: T;
};

const useSwitchToggle = <T extends string>({
  viewKey,
  selectedOption,
  alternativeOption,
}: UseSwitchButtonState<T>) => {
  const searchParams = useSearchParams();
  const defaultQueryValue = searchParams.get(viewKey);
  const router = useRouter();
  const [toggle, setToggle] = useState<T>(
    defaultQueryValue === alternativeOption ? alternativeOption : selectedOption,
  );

  const handleToggleToFirst = () => {
    if (toggle === selectedOption) {
      return;
    }

    setToggle(selectedOption);
    router.replace(`?${viewKey}=${selectedOption}`);
  };

  const handleToggleToSecond = () => {
    if (toggle === alternativeOption) {
      return;
    }

    setToggle(alternativeOption);
    router.replace(`?${viewKey}=${alternativeOption}`);
  };

  return {
    toggle,
    handleToggleToFirst,
    handleToggleToSecond,
  };
};

export default useSwitchToggle;
