"use client";

import { useEffect, useState } from "react";

import { CloseIcon } from "@/app/_components/server";

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
          // TODO - 추후 shadow 변수 적용하기
          className="w-[20rem] h-[6rem] shadow-[0_0_2rem_0_rgba(0,0,0,0.2)] rounded-radius5 relative overflow-hidden"
        >
          <button
            type="button"
            className="absolute top-[0.2rem] right-[0.2rem] hover:opacity-30 transition-opacity"
          >
            <CloseIcon size={16} />
          </button>

          <p className="w-full h-[5.5rem] px-[1rem] py-[0.6rem]">{message}</p>

          <div className="w-full h-[0.5rem] flex justify-end bg-example_gray_900">
            <motion.div
              className="h-full bg-emerald-700"
              initial={{ width: "100%" }}
              animate={{
                width: "0%",
                transition: { duration: deleteTime / 1000 },
              }}
            />
          </div>
        </motion.li>
      )}
    </AnimatePresence>
  );
};

export default ToastItem;
