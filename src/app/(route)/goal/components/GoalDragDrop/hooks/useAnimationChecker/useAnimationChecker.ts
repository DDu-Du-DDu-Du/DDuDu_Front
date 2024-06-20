import { useEffect, useState } from "react";

const useAnimationChecker = () => {
  const [checker, setChecker] = useState(false);

  useEffect(() => {
    const animation = requestAnimationFrame(() => setChecker(true));

    return () => {
      cancelAnimationFrame(animation);
      setChecker(false);
    };
  }, []);

  return {
    checker,
  };
};

export default useAnimationChecker;
