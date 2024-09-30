import { Header } from "@/app/_components/client";
import { GOAL_KEY } from "@/app/_constants/queryKey/queryKey";
import { getGoalEditorData } from "@/app/_services/client/goalEditor";
import { auth } from "@/auth";
import { HydrationBoundary, QueryClient, dehydrate } from "@tanstack/react-query";

import { GoalEditor } from "./components";

interface GoalEditorPageProps {
  searchParams: {
    id: string;
  };
}

const GoalEditorPage = async ({ searchParams }: GoalEditorPageProps) => {
  const { id } = searchParams;

  const session = await auth();

  const queryclient = new QueryClient();

  if (id) {
    await queryclient.prefetchQuery({
      queryKey: [GOAL_KEY.GOAL_EDITOR, id],
      queryFn: () => getGoalEditorData(session?.sessionToken as string, id),
    });
  }

  const dehydratedState = dehydrate(queryclient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <section>
        <Header headerLabel={id ? "목표수정" : "목표등록"} />
        <GoalEditor goalId={id} />
      </section>
    </HydrationBoundary>
  );
};

export default GoalEditorPage;
