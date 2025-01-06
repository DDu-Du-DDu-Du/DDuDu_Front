import { signInWithKakao } from "@/app/_api/serverActions/auth";
import { MessageIcon } from "@/app/_components/server";

import LoginTitle from "./components/LoginTitle/LoginTitle";

const LoginPage = async () => {
  return (
    <article className="flex justify-between flex-col h-[100%] px-[2rem] pt-[14rem] pb-[10rem]">
      <LoginTitle />
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
