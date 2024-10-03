import { signInWithKakao } from "@/app/_api/serverActions/auth";
import { MessageIcon } from "@/app/_components/server";

const LoginPage = async () => {
  return (
    <article className="flex justify-between flex-col h-[100%] px-[2rem] pt-[14rem] pb-[10rem]">
      <div className="text-[3rem] leading-[3rem]">
        <h3>모두를 위한 서비스</h3>
        <h2 className="font-bold mt-[0.5rem]">뚜두뚜두</h2>
        <span className="text-[1.6rem]">계획을 세우고 성취감을 느껴보세요!</span>
      </div>
      <form action={signInWithKakao}>
        <button className="w-[100%] h-[5.6rem] flex justify-center items-center rounded-radius10 bg-example_yellow_400">
          <MessageIcon className="mr-2 h-9 w-9" />
          <span className="text-large font-medium">카카오로 계속하기</span>
        </button>
      </form>
    </article>
  );
};

export default LoginPage;
