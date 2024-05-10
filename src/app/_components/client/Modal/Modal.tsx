"use client";

import { ModalPortal } from "./components";

import { AnimatePresence, motion } from "framer-motion";

interface ModalProps {
  children: React.ReactNode;
  isShow: boolean;
  width?: string;
  height?: string;
  backgroundColor?: string;
}

const Modal = ({
  children,
  isShow = false,
  width = "300px",
  height,
  backgroundColor,
}: ModalProps) => {
  return (
    <>
      {isShow && (
        <ModalPortal>
          <AnimatePresence>
            <motion.section
              initial={{ opacity: 0, x: "-50%", y: "-40%" }}
              animate={{ opacity: 1, x: "-50%", y: "-50%" }}
              exit={{ opacity: 0, x: "-50%", y: "-40%" }}
              whileTap={{ scale: 0.95 }}
              className={`absolute left-[50%] top-[50%] z-modal rounded-radius10 text-center shadow-shadow_100`}
              style={{ width, height, backgroundColor }}
            >
              {children}
            </motion.section>
          </AnimatePresence>
          {isShow && <div className="fixed inset-0 z-10 size-[100%] opacity-0" />}
        </ModalPortal>
      )}
    </>
  );
};

export default Modal;
