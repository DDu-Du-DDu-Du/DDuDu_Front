interface TimeStampProps {
  children: React.ReactNode;
}

const TimeStamp = ({ children }: TimeStampProps) => {
  return (
    <div className="flex w-[5rem] items-center justify-center pl-[1rem] h-[5.7rem]">
      <p className="flex h-[2.4rem] w-[4rem] items-center justify-center rounded-[0.5rem] text-size12 shadow-example_shadow">
        {children}
      </p>
    </div>
  );
};

export default TimeStamp;
