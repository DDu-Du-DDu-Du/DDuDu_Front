import { Modal } from "@/app/_components/client";

import Image, { StaticImageData } from "next/image";

export interface ConfirmModalProps {
  isToggle: boolean;
  title: string;
  message?: string;
  imageUrl?: StaticImageData;
  completeText?: string;
  incompleteText?: string;
  handleToggleOff: () => void;
  onCompleteCheck: (isComplete: boolean) => void;
}

const ConfirmModal = ({
  isToggle,
  title,
  message,
  imageUrl,
  completeText = "확인",
  incompleteText = "취소",
  handleToggleOff,
  onCompleteCheck,
}: ConfirmModalProps) => {
  const handleClickComplete = () => {
    onCompleteCheck(true);
    handleToggleOff();
  };

  const handleClickIncomplete = () => {
    onCompleteCheck(false);
    handleToggleOff();
  };

  return (
    <Modal isToggle={isToggle}>
      <h3 className="mb-[2rem] pt-[2.4rem] text-size15 font-medium">{title}</h3>
      {message && (
        <p className="mb-[3.2rem] whitespace-pre-line text-size13 font-regular">{message}</p>
      )}
      {imageUrl && (
        <figure>
          <Image
            className="mx-auto mb-[3.2rem]"
            src={imageUrl}
            alt="확인 알림 이미지"
          />
        </figure>
      )}
      <div className="flex gap-[1rem] px-[1rem] pb-[1rem]">
        <button
          className="mx-auto h-[5.2rem] flex-1 rounded-[1rem] bg-[#D9D9D9] text-size15 font-medium"
          onClick={handleClickComplete}
        >
          {completeText}
        </button>
        <button
          className="mx-auto h-[5.2rem] flex-1 rounded-[1rem] bg-[#D9D9D9] text-size15 font-medium"
          onClick={handleClickIncomplete}
        >
          {incompleteText}
        </button>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
