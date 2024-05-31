import { Header } from "@/app/_components/client";

import { GoalEditor } from "./components";

interface GoalEditorPageProps {
  searchParams: {
    id: string;
  };
}

const GoalEditorPage = ({ searchParams }: GoalEditorPageProps) => {
  const { id } = searchParams;

  return (
    <section>
      <Header />
      <GoalEditor goalId={id} />
    </section>
  );
};

export default GoalEditorPage;
