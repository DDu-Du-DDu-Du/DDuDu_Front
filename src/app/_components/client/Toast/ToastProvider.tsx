"use client";

import React, { createContext } from "react";

import { ToastItem } from "./components";
import { useToastList } from "./hooks";

interface ToastContextValues {
  createToast: (message: string) => void;
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
      <ul className="absolute right-0 top-0 flex flex-col">
        {toastList.map(({ id, message }) => (
          <ToastItem
            key={id}
            message={message}
          />
        ))}
      </ul>
    </ToastContext.Provider>
  );
};

export default ToastProvider;
