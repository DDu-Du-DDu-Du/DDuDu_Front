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
  const { toastList, createToast, removeToast } = useToastList();

  return (
    <ToastContext.Provider value={{ createToast }}>
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
    </ToastContext.Provider>
  );
};

export default ToastProvider;
