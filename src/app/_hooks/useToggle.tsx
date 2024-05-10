import { useState } from "react";

const useToggle = () => {
  const [isShow, setIsShow] = useState(false);

  const handleClickOpen = () => {
    setIsShow(true);
  };

  const handleClickClose = () => {
    setIsShow(false);
  };

  const handleClickToggle = () => {
    setIsShow(!isShow);
  };

  return {
    isShow,
    handleClickOpen,
    handleClickClose,
    handleClickToggle,
  };
};

export default useToggle;
