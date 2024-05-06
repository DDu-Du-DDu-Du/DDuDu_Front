"use client";

import { MouseEvent, TouchEvent, forwardRef } from "react";

import { BottomDraggingStateType } from "../../BottomSheet.type";

import { motion } from "framer-motion";

interface BottomHeaderProps {
  onActionStart: (event: MouseEvent<HTMLElement> | TouchEvent<HTMLElement>) => void;
  draggingState: BottomDraggingStateType;
}

const BottomHeader = forwardRef<HTMLElement, BottomHeaderProps>(
  ({ onActionStart, draggingState }, ref) => {
    return (
      <header
        className="w-full h-[3.2rem] flex items-center justify-center touch-none"
        onMouseDown={onActionStart}
        onTouchStart={onActionStart}
        ref={ref}
      >
        <motion.div
          animate={draggingState}
          variants={{
            center: { x: 2 },
            up: { x: 2, rotate: -10 },
            down: { x: 2, rotate: 10 },
          }}
          className="w-[5rem] h-[0.6rem] bg-example_gray_700 rounded-circle"
        />

        <motion.div
          animate={draggingState}
          variants={{
            center: { x: -2 },
            up: { x: -2, rotate: 10 },
            down: { x: -2, rotate: -10 },
          }}
          className="w-[5rem] h-[0.6rem] bg-example_gray_700 rounded-circle"
        />
      </header>
    );
  },
);

BottomHeader.displayName = "BottomHeader";
export default BottomHeader;
