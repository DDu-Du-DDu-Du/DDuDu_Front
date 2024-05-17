import { Modal } from "@/app/_components/client";

import Image, { StaticImageData } from "next/image";

export interface AlertModalProps {
  isToggle: boolean;
  title: string;
  message?: string;
  imageUrl?: StaticImageData;
  completeText?: string;
  handleToggleOff: () => void;
}

const AlertModal = ({
  title,
  message,
  imageUrl,
  isToggle,
  completeText = "확인",
  handleToggleOff,
}: AlertModalProps) => {
  return (
    <Modal isToggle={isToggle}>
      <h3 className="mb-[2rem] pt-[2.4rem] text-size15 font-medium">{title}</h3>
      {message && (
        <p className="mb-[3.2rem] whitespace-pre-line text-size13 font-regular">{message}</p>
      )}
      {imageUrl && (
        <figure className="relative w-[94%] mx-auto rounded-[1rem] max-w-[30rem] max-h-[31rem]">
          <Image
            className="mx-auto mb-[3.2rem]"
            src={imageUrl}
            alt="경고(알림) 이미지입니다."
            width="300"
            height="310"
            priority
          />
        </figure>
      )}
      <button
        className="mx-auto mb-[0.9rem] block h-[5.2rem] w-[94%] rounded-[1rem] bg-[#D9D9D9] text-size15 font-medium"
        onClick={handleToggleOff}
      >
        {completeText}
      </button>
    </Modal>
  );
};

export default AlertModal;
