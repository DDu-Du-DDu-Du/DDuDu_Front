import { GoalPrivacyType, RepeatDdudusType } from "@/app/_types/response/goal/goal";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export interface UseGoalFormStoreState {
  type: "CREATE" | "EDIT";
  isLoad: boolean;
  isEditing: boolean;
  goalText: string;
  goalPrivacy: GoalPrivacyType;
  color: string;
  repeatDDuDu: RepeatDdudusType[];
  hasHydrated: boolean;
  setHasHydrated: (hasHydrated: boolean) => void;
  setIsLoad: (isLoad: boolean) => void;
  setIsEditing: (isEditing: boolean) => void;
  setGoalText: (goalText: string) => void;
  setGoalPrivacy: (goalPrivacy: GoalPrivacyType) => void;
  setColor: (color: string) => void;
  setRepeatDDuDu: (repeatDDuDu: RepeatDdudusType[]) => void;
  setAddRepeatDDuDu: (repeatDDuDu: RepeatDdudusType) => void;
  initialize: ({ type, goalText, goalPrivacy, color, repeatDDuDu }: UseGoalFormStoreProps) => void;
  reset: () => void;
}

export interface UseGoalFormStoreProps {
  type?: "CREATE" | "EDIT";
  goalText: string;
  goalPrivacy: GoalPrivacyType;
  color: string;
  repeatDDuDu: RepeatDdudusType[];
}

const useGoalFormStore = create(
  persist<UseGoalFormStoreState>(
    (set) => ({
      type: "CREATE",
      isLoad: false,
      isEditing: false,
      goalText: "",
      goalPrivacy: "PUBLIC",
      color: "#1D1D1B",
      repeatDDuDu: [],
      hasHydrated: false,
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      setIsLoad: (isLoad) => set({ isLoad }),
      setIsEditing: (isEditing) => set({ isEditing }),
      setGoalText: (goalText) => set({ goalText }),
      setGoalPrivacy: (goalPrivacy) => set({ goalPrivacy }),
      setColor: (color) => set({ color }),
      setRepeatDDuDu: (repeatDDuDu) => set({ repeatDDuDu }),
      setAddRepeatDDuDu: (repeatDDuDu) =>
        set((state) => ({ repeatDDuDu: [...state.repeatDDuDu, repeatDDuDu] })),
      initialize: ({ type, goalText, goalPrivacy, color, repeatDDuDu }) =>
        set({ type, goalText, goalPrivacy, color, repeatDDuDu }),
      reset: () =>
        set({
          type: "CREATE",
          isLoad: false,
          isEditing: false,
          goalText: "",
          goalPrivacy: "PUBLIC",
          color: "#1D1D1B",
          repeatDDuDu: [],
        }),
    }),
    {
      name: "temp-data",
      storage: createJSONStorage(() => sessionStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);

export default useGoalFormStore;
