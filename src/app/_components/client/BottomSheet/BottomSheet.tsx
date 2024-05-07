"use client";

import { BottomHeader, BottomPortal } from "./components";
import { useChangeSheetHeight, useSheetAction, useSheetAnimationState } from "./hooks";

import { AnimatePresence, motion } from "framer-motion";

interface BottomSheetProps {
  children: React.ReactNode;
  isShow: boolean;
  onClose?: () => void;

  defaultHeight?: string | number;
  maxHeight?: string | number;
}

const BottomSheet = ({
  children,
  isShow,
  onClose,

  defaultHeight = "35dvh",
  maxHeight = "80dvh",
}: BottomSheetProps) => {
  const { isOpenSheet, activePortal, handleUnActivePortal } = useSheetAnimationState({
    isShow,
  });

  const { targetRef, movementHeight, sheetState, draggingState, handleStartAction, initState } =
    useSheetAction({
      onClose,
    });

  const sheetHeight = useChangeSheetHeight({
    sheetState,
    defaultHeight,
    maxHeight,
  });

  return (
    <BottomPortal isShow={activePortal}>
      <AnimatePresence
        onExitComplete={() => {
          if (onClose) {
            onClose();
          }

          handleUnActivePortal();
          initState();
        }}
      >
        {isOpenSheet && (
          <motion.article
            initial={{ y: "100%" }}
            animate={{ y: `0%`, height: sheetHeight }}
            exit={{ y: "100%" }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            whileTap={{
              height: movementHeight ? `${movementHeight}px` : sheetHeight,
              transition: { duration: 0 },
            }}
            className="w-full flex flex-col rounded-tl-[2.4rem] rounded-tr-[2.4rem] bg-example_gray_300 overflow-hidden shadow-[0_0_2rem_0.4rem_rgba(0,0,0,0.1)]"
            style={{
              maxHeight: maxHeight,
              minHeight: "3.2rem",
              willChange: "all",
            }}
          >
            <BottomHeader
              onActionStart={handleStartAction}
              draggingState={draggingState}
              ref={targetRef}
            />
            <div className="w-full flex-1 overflow-scroll scrollbar-hide">{children}</div>
          </motion.article>
        )}
      </AnimatePresence>
    </BottomPortal>
  );
};

export default BottomSheet;
