"use client";

import React from "react";

import { ToastItem } from "./components";
import { useToastStore } from "./store";

interface ToastProviderProps {
  children: React.ReactNode;
}

const ToastProvider = ({ children }: ToastProviderProps) => {
  const { toastList, removeToast } = useToastStore();

  return (
    <>
      {children}
      <ul className="absolute right-[1rem] top-[1rem] flex flex-col gap-[0.6rem] text-size14 z-toast">
        {toastList.map(({ id, message, deleteTime, type }) => (
          <ToastItem
            key={id}
            message={message}
            deleteTime={deleteTime}
            type={type}
            onRemove={() => removeToast(id)}
          />
        ))}
      </ul>
    </>
  );
};

export default ToastProvider;
