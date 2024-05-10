const LineBox = () => {
  return (
    <div className=" absolute left-[5rem] flex h-full w-[5rem] justify-center">
      <hr className="h-full w-[0.3rem] relative before:content-[''] before:absolute before:left-[50%] before:translate-x-[-50%] before:h-[100%] before:w-[0.3rem] border-l-[0.3rem] border-dashed" />
    </div>
  );
};

export default LineBox;
