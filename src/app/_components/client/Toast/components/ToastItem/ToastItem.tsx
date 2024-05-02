"use client";

import { motion } from "framer-motion";

interface ToastProps {
  message: string;
}

const ToastItem = ({ message }: ToastProps) => {
  return (
    <motion.li
      initial={{
        translateX: "100%",
        scale: 0.5,
        opacity: 0,
      }}
      animate={{
        translateX: "0%",
        scale: 1,
        opacity: 1,
      }}
      className="w-[18rem] h-[6rem] bg-slate-400 rounded-radius10"
    >
      {message}
    </motion.li>
  );
};

export default ToastItem;
