import { useState } from "react";

const useClickAvatarList = () => {
  const [toggle, setToggle] = useState(false);

  const handleClickAvatar = () => {
    setToggle(!toggle);
  };

  const handleClickBackground = () => {
    setToggle(false);
  };

  return {
    toggle,
    handleClickAvatar,
    handleClickBackground,
  };
};

export default useClickAvatarList;
