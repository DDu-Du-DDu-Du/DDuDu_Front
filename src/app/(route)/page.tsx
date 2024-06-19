// import { auth } from "@/auth";
import { signInWithKakao } from "../_api/serverActions/auth";

// import { QUERY_KEY, QUERY_OPTIONS, getQueryClient } from "../_constants";

const Home = async () => {
  // const queryClient = getQueryClient();

  // await queryClient.prefetchQuery(QUERY_OPTIONS.TEST());

  // const data = queryClient.getQueryData(QUERY_KEY.TEST);

  // console.log(data);

  return (
    <main className="h-full w-full">
      DDuDu
      <form action={signInWithKakao}>
        <button type="submit">로그인 버튼 (테스트용)</button>
      </form>
    </main>
  );
};

export default Home;
