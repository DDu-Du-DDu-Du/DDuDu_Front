import { Header } from "@/app/_components/client";

import { DDuDuRepeatEditor } from "./components";

interface GoalEditorDDuDuRepeatPageProps {
  params: { id: string };
  searchParams: { id: string };
}

const GoalEditorDDuDuRepeatPage = ({ params, searchParams }: GoalEditorDDuDuRepeatPageProps) => {
  const { id: goalId } = params;
  const { id: repeatId } = searchParams;

  console.log("params goalId", goalId);
  console.log("searchParams repeatId", repeatId);

  return (
    <section>
      <Header headerLabel={repeatId ? "반복수정" : "반복생성"} />
      <DDuDuRepeatEditor
        goalId={goalId}
        repeatId={repeatId}
      />
    </section>
  );
};

export default GoalEditorDDuDuRepeatPage;
