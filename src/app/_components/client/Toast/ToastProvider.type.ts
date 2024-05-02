export interface ToastItemType {
  id: string;
  message: string;
}

export type ToastType = "alert" | "warning" | "danger" | "safe";

export interface CreateToastOptionsType {
  deleteTime?: number;
  type?: ToastType;
}

export type CreateToastFunc = (message: string, options?: CreateToastOptionsType) => void;
