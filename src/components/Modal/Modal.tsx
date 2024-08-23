import * as S from "./Modal.styles";

import { ModalPortal } from "./components";
import { useAwayClickModal } from "./hooks";

import { AnimatePresence } from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  isToggle: boolean;
  width?: string;
  height?: string;
  backgroundColor?: string;
  onAwayClick?: () => void;
}

const Modal = ({
  children,
  isToggle,
  width = "20rem",
  height = "30rem",
  backgroundColor,
  onAwayClick,
}: ModalProps) => {
  const handleAwayClick = useAwayClickModal({ callback: onAwayClick });

  return (
    <AnimatePresence>
      {isToggle && (
        <ModalPortal>
          <S.ModalBackground
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleAwayClick}
          >
            <S.ModalLayout
              initial={{ opacity: 0, y: "-10%" }}
              animate={{ opacity: 1, y: "0%" }}
              exit={{ opacity: 0, y: "-10%" }}
              whileTap={{ scale: 0.95 }}
              $width={width}
              $height={height}
              $backgroundColor={backgroundColor}
            >
              {children}
            </S.ModalLayout>
          </S.ModalBackground>
        </ModalPortal>
      )}
    </AnimatePresence>
  );
};

export default Modal;
