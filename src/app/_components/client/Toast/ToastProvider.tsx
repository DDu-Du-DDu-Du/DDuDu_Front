"use client";

import React, { createContext } from "react";

import { CreateToastFunc } from "./ToastProvider.type";
import { ToastItem } from "./components";
import { useToastList } from "./hooks";

interface ToastContextValues {
  createToast: CreateToastFunc;
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export const ToastContext = createContext<ToastContextValues>({
  createToast: () => {},
});

const ToastProvider = ({ children }: ToastProviderProps) => {
  const { toastList, createToast } = useToastList();

  return (
    <ToastContext.Provider value={{ createToast }}>
      {children}
      <ul className="absolute right-0 top-0 flex flex-col gap-[0.6rem]">
        {toastList.map(({ id, message, deleteTime }) => (
          <ToastItem
            key={id}
            message={message}
            deleteTime={deleteTime}
          />
        ))}
      </ul>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
