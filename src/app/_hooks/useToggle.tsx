import { useState } from "react";

const useToggle = () => {
  const [isToggle, setIsToggle] = useState(false);

  const handleToggleOn = () => {
    setIsToggle(true);
  };

  const handleToggleOff = () => {
    setIsToggle(false);
  };

  const handleToggle = () => {
    setIsToggle((prevState) => !prevState);
  };

  return {
    isToggle,
    handleToggleOn,
    handleToggleOff,
    handleToggle,
  };
};

export default useToggle;
