import { QUERY_KEY, QUERY_OPTIONS, getQueryClient } from "../_constants";

const Home = async () => {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery(QUERY_OPTIONS.TEST());

  const data = queryClient.getQueryData(QUERY_KEY.TEST);

  console.log(data);

  return <main className="h-full w-full">DDuDu</main>;
};

export default Home;
