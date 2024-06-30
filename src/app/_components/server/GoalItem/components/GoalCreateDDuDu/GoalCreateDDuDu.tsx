import { PlusIcon } from "../../../icons";

interface GoalCreateDDuDuProps {
  goalName: string;
  onOpenDDuDuInput?: () => void;
}

const GoalCreateDDuDu = ({ goalName, onOpenDDuDuInput }: GoalCreateDDuDuProps) => {
  const handleOpenDDuduInput = () => {
    if (!onOpenDDuDuInput) {
      return null;
    }

    onOpenDDuDuInput();
  };

  return (
    <h3
      className="inline-flex items-center mb-[1.6rem]"
      onClick={handleOpenDDuduInput}
    >
      <div className="inline-block py-[0.9rem] px-[0.9rem] bg-example_gray_100 rounded-radius15 select-none cursor-pointer">
        <strong className="pr-[0.8rem]">{goalName}</strong>
        <span className="inline-flex justify-center items-center size-[2rem] bg-white_100 rounded-circle">
          <PlusIcon size={12} />
        </span>
      </div>
    </h3>
  );
};

export default GoalCreateDDuDu;
