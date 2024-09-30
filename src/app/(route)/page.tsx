import { signInWithKakao } from "../_api/serverActions/auth";

import Link from "next/link";

const Home = async () => {
  return (
    <main className="h-full w-full">
      <form action={signInWithKakao}>
        <button type="submit">로그인 버튼 (테스트용)</button>
      </form>
      <Link href="/feed?view=ddudu">메인 피드 페이지</Link>
    </main>
  );
};

export default Home;
