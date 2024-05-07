interface HeaderButtonProps {
  buttonFn?: () => void;
  children?: React.ReactNode;
  buttonPosition: "LEFT" | "RIGHT";
}

const HeaderButton = ({ buttonFn, buttonPosition, children }: HeaderButtonProps) => {
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
      {children}
    </button>
  );
};

export default HeaderButton;
