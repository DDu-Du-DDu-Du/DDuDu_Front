import * as S from "./ToastItem.styles";

import { CloseIcon } from "@/components/icons";

import { ToastType } from "../../ToastProvider.type";
import { useToastDeleteTimer } from "./hooks";

import { AnimatePresence } from "framer-motion";

interface ToastItemProps {
  message: string;
  deleteTime: number;
  type: ToastType;
  onRemove: () => void;
}

const ToastItem = ({ message, deleteTime, type, onRemove }: ToastItemProps) => {
  const isShow = useToastDeleteTimer({ time: deleteTime });

  const initialStyle = {
    translateX: "100%",
    scale: 0.5,
    opacity: 0,
  };

  return (
    <AnimatePresence>
      {isShow && (
        <S.ToastItemLayout
          initial={initialStyle}
          animate={{
            translateX: "0%",
            scale: 1,
            opacity: 1,
          }}
          exit={initialStyle}
        >
          <S.ToastCloseButton
            onClick={onRemove}
            type="button"
          >
            <CloseIcon size={16} />
          </S.ToastCloseButton>

          <S.ToastItemContent dangerouslySetInnerHTML={{ __html: message }} />

          <S.ToastProgressbarOutline>
            <S.ToastProgressbar
              initial={{ translate: "-100%" }}
              animate={{
                translate: "0%",
                transition: { duration: deleteTime / 1000 + 0.05, ease: "linear" },
              }}
              $toastType={type}
            />
          </S.ToastProgressbarOutline>
        </S.ToastItemLayout>
      )}
    </AnimatePresence>
  );
};

export default ToastItem;
