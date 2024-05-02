"use client";

import { useContext } from "react";

import { ToastContext } from "../../ToastProvider";

const useToast = () => {
  return useContext(ToastContext);
};

export default useToast;
