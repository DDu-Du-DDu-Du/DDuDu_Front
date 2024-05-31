import { GoalPrivacyType } from "@/app/(route)/goal/editor/components/GoalEditor/GoalEditor.types";
import { BottomSheet, Button, SheetButton } from "@/app/_components/client";
import { ExampleIcon } from "@/app/_components/server";

interface PrivacySheetProps {
  isShow: boolean;
  onClose: () => void;
  onClick: (goalPrivacy: GoalPrivacyType) => void;
}

const PrivacySheet = ({ isShow, onClose, onClick }: PrivacySheetProps) => {
  const handleClickPublic = () => {
    onClick("PUBLIC");
  };

  const handleClickFollower = () => {
    onClick("FOLLOWER");
  };

  const handleClickPrivate = () => {
    onClick("PRIVATE");
  };

  return (
    <BottomSheet
      isShow={isShow}
      onClose={onClose}
      defaultHeight="fit-content"
      maxHeight="fit-content"
    >
      <div className="p-[2rem] box-border">
        <div className="flex flex-col px-[0.4rem] gap-[1.6rem] mb-[2.1rem]">
          <SheetButton
            buttonType="sub"
            title="전체공개"
            Icon={<ExampleIcon />}
            onClick={handleClickPublic}
          />
          <SheetButton
            buttonType="sub"
            title="팔로워 공개"
            Icon={<ExampleIcon />}
            onClick={handleClickFollower}
          />
          <SheetButton
            buttonType="sub"
            title="나만보기"
            Icon={<ExampleIcon />}
            onClick={handleClickPrivate}
          />
        </div>
        <Button
          onClick={onClose}
          className="w-full h-[5.6rem]"
          fontSize="large"
          backgroundColor="orange"
        >
          확인
        </Button>
      </div>
    </BottomSheet>
  );
};

export default PrivacySheet;
