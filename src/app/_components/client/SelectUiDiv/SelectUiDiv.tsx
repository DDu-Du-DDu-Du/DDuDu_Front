interface SelectUiDivProps {
  children?: React.ReactNode;
  backgroundColor?: string;
  width?: string;
  onClick: () => void;
}

const SelectUiDiv = ({
  children,
  backgroundColor = "#F5F5F5",
  width,
  onClick,
}: SelectUiDivProps) => {
  return (
    <div
      className="relative pl-[1.4rem] pr-[2.4rem] py-[1rem] rounded-[1rem] cursor-pointer"
      style={{ backgroundColor, width }}
      onClick={onClick}
    >
      <strong className="inline-block text-size13 font-regular leading-[1.3rem]">{children}</strong>
      <span className="absolute top-[50%] right-[1.1rem] w-0 h-0 border-t-[0.4rem] border-t-example_gray_700 border-l-transparent border-r-transparent border-l-[0.3rem] border-r-[0.3rem] translate-y-[-50%]" />
    </div>
  );
};

export default SelectUiDiv;
