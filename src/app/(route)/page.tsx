// import { auth as getSession } from "@/auth";
import { signInWithKakao } from "../_api/serverActions/auth";
import { QUERY_KEY, QUERY_OPTIONS, getQueryClient } from "../_constants";

import Link from "next/link";

const Home = async () => {
  // const session = await getSession();
  // console.log("homeSession(server):", session);

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(QUERY_OPTIONS.TEST());

  const data = queryClient.getQueryData(QUERY_KEY.TEST);

  console.log(data);

  return (
    <main className="h-full w-full">
      DDuDu
      <form action={signInWithKakao}>
        <button type="submit">로그인</button>
      </form>
      <Link href="/login">링크?</Link>
    </main>
  );
};

export default Home;
