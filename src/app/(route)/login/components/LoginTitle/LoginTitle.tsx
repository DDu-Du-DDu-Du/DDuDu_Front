"use client";

import { motion } from "framer-motion";

const LoginTitle = () => {
  return (
    <motion.div
      className="text-[3rem] leading-[3rem]"
      initial={{ y: 0 }}
      animate={{ y: 20 }}
      transition={{
        ease: "linear",
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      <h3>모두를 위한 서비스</h3>
      <h2 className="font-bold mt-[0.5rem]">뚜두뚜두</h2>
      <span className="text-[1.6rem]">계획을 세우고 성취감을 느껴보세요!</span>
    </motion.div>
  );
};

export default LoginTitle;
