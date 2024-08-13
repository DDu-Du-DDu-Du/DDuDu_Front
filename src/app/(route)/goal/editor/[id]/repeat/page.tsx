import { Header } from "@/app/_components/client";

import { DDuDuRepeatEditor } from "./components";

interface GoalEditorDDuDuRepeatPageProps {
  params: { id: string };
  searchParams: { id: string };
}

const GoalEditorDDuDuRepeatPage = ({ params, searchParams }: GoalEditorDDuDuRepeatPageProps) => {
  const { id: goalId } = params;
  const { id: repeatId } = searchParams;

  return (
    <section>
      <Header />
      <DDuDuRepeatEditor
        goalId={goalId}
        repeatId={repeatId}
      />
    </section>
  );
};

export default GoalEditorDDuDuRepeatPage;
