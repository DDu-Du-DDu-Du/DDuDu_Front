export interface ToastItemType {
  id: string;
  message: string;
}

export interface CreateToastOptionsType {
  deleteTime?: number;
}

export type CreateToastFunc = (message: string, options?: CreateToastOptionsType) => void;
