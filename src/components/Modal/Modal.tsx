import * as S from "./Modal.styles";

import { ModalPortal } from "./components";

import { AnimatePresence } from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  isToggle: boolean;
  width?: string;
  height?: string;
  backgroundColor?: string;
}

const Modal = ({
  children,
  isToggle,
  width = "20rem",
  height = "30rem",
  backgroundColor,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isToggle && (
        <ModalPortal>
          <S.ModalBackground
            initial={{ opacity: 0, x: "-50%", y: "-40%" }}
            animate={{ opacity: 1, x: "-50%", y: "-50%" }}
            whileTap={{ scale: 0.95 }}
            $width={width}
            $height={height}
            $backgroundColor={backgroundColor}
          >
            {children}
          </S.ModalBackground>

          {isToggle && <S.ModalSpacing className="fixed inset-0 z-10 size-[100%] opacity-0" />}
        </ModalPortal>
      )}
    </AnimatePresence>
  );
};

export default Modal;
