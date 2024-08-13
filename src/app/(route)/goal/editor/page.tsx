import { Header } from "@/app/_components/client";
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
      queryKey: ["goal", "editor", id],
      queryFn: () => getGoalEditorData(session?.sessionToken as string, id),
    });
  }

  const dehydratedState = dehydrate(queryclient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <section>
        <Header />
        <GoalEditor goalId={id} />
      </section>
    </HydrationBoundary>
  );
};

export default GoalEditorPage;
