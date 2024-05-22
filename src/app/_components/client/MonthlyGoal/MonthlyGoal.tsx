"use-client";

const MonthlyGoal = () => {
  return (
    <div className="w-[31.2rem] h-[4.6rem] flex justify-center items-center">
      <input
        type="text"
        placeholder="월 별 목표를 설정해보세요!"
        className="w-full h-full p-4 bg-example_gray_100 focus:outline-none rounded-radius10 text-size11"
      />
    </div>
  );
};

export default MonthlyGoal;
