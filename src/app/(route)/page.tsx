"use client";

import { BottomSheet, useBottomSheet } from "../_components/client/BottomSheet";

const Home = () => {
  // 특정 액션 혹은 조건의 상황에서 Bottom Sheet를 사용해야하는 경우 해당 hook을 사용
  const { isShow, handleCloseSheet, handleOpenSheet } = useBottomSheet();

  return (
    <main className="w-full h-[1000rem]">
      <button
        onClick={handleOpenSheet}
        className="text-size16 font-bold px-[4rem] py-[2rem] rounded-radius10 bg-example_gray_900 text-white"
      >
        toggle
      </button>

      <BottomSheet
        // hook을 사용할 경우 hook내부 isShow값을 연결
        // 만약 어느 상황에서도 bottomSheet가 존재해야한다면 true값 전달
        isShow={isShow}
        // hook을 사용하는 경우 반드시 해당 메서드 연결
        onClose={handleCloseSheet}
      >
        {/* 내부 children 자유롭게 넣을 수 있음 */}
        <div className="h-[15rem] bg-red-50"></div>
        <div className="h-[15rem] bg-red-100"></div>
        <div className="h-[15rem] bg-red-200"></div>
        <div className="h-[15rem] bg-red-300"></div>
        <div className="h-[15rem] bg-red-400"></div>
        <div className="h-[15rem] bg-red-500"></div>
        <div className="h-[15rem] bg-red-600"></div>
        <div className="h-[15rem] bg-red-700"></div>
        <div className="h-[15rem] bg-red-800"></div>
        <div className="h-[15rem] bg-red-900"></div>
      </BottomSheet>
    </main>
  );
};

export default Home;
