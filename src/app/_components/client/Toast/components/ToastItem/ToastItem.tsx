"use client";

import { useEffect, useState } from "react";

import { AnimatePresence, motion } from "framer-motion";

interface ToastProps {
  message: string;
  deleteTime: number;
}

const ToastItem = ({ message, deleteTime }: ToastProps) => {
  const [isShow, setIsShow] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsShow(false);
    }, deleteTime);
  }, [deleteTime]);

  const initialStyle = {
    translateX: "100%",
    scale: 0.5,
    opacity: 0,
  };

  return (
    <AnimatePresence>
      {isShow && (
        <motion.li
          initial={initialStyle}
          animate={{
            translateX: "0%",
            scale: 1,
            opacity: 1,
          }}
          exit={initialStyle}
          className="w-[18rem] h-[6rem] bg-slate-400 rounded-radius10"
        >
          {message}
        </motion.li>
      )}
    </AnimatePresence>
  );
};

export default ToastItem;
