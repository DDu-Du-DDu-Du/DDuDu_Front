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
      <div className="flex flex-col gap-[1.6rem] p-[2rem] box-border">
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
        <Button
          onClick={onClose}
          className="w-full max-w-[50rem] h-[5.6rem]"
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
