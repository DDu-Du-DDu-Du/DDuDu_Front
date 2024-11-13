import { DDuDuRepeatEditor } from "./components";

interface GoalEditorDDuDuRepeatPageProps {
  params: { id: string };
}

const GoalEditorDDuDuRepeatPage = ({ params }: GoalEditorDDuDuRepeatPageProps) => {
  const { id: goalId } = params;

  return (
    <section>
      <DDuDuRepeatEditor goalId={goalId} />
    </section>
  );
};

export default GoalEditorDDuDuRepeatPage;
