"use client";

import { BottomHeader, BottomPortal } from "./components";
import { useSheetAnimationState } from "./hooks";

import { AnimatePresence, motion } from "framer-motion";

interface BottomSheetProps {
  children: React.ReactNode;
  isShow: boolean;
}

const BottomSheet = ({ isShow, children }: BottomSheetProps) => {
  const { isOpenSheet, activePortal, handleCloseSheet } = useSheetAnimationState({ isShow });
  return (
    <BottomPortal isShow={activePortal}>
      <AnimatePresence onExitComplete={handleCloseSheet}>
        {isOpenSheet && (
          <motion.article
            initial={{ y: "100%" }}
            animate={{ y: `0%` }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.3,
              ease: "easeInOut",
            }}
            className="w-full rounded-tl-[2.4rem] rounded-tr-[2.4rem] bg-slate-500 overflow-hidden"
          >
            <BottomHeader />
            {children}
          </motion.article>
        )}
      </AnimatePresence>
    </BottomPortal>
  );
};

export default BottomSheet;
