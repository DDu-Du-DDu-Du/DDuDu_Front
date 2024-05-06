interface HeaderButtonProps {
  buttonFn?: () => void;
  buttonIcon?: React.ReactNode;
  buttonPosition: "LEFT" | "RIGHT";
}

const HeaderButton = ({ buttonFn, buttonIcon, buttonPosition }: HeaderButtonProps) => {
  if (!buttonFn) {
    return <></>;
  }

  const buttonPositionVariants = {
    LEFT: "left-[2.4rem] top-[1.9rem]",
    RIGHT: "right-[2.4rem] top-[1.9rem]",
  };

  return (
    <button
      className={`absolute flex h-[1.6rem] w-[1.6rem] items-center justify-center ${buttonPositionVariants[buttonPosition]}`}
      onClick={buttonFn}
    >
      {buttonIcon}
    </button>
  );
};

export default HeaderButton;
