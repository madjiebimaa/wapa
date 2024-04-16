import { create } from "zustand";

import { DEFAULT_BACKGROUND_COLOR } from "@/lib/constants";
import { Color } from "@/lib/types";

type ColorState = {
  selectedBackgroundColor: Color["hexCode"];
};

type ColorActions = {
  actions: {
    selectBackgroundColor: (hexCode: Color["hexCode"]) => void;
  };
};

const initialState: ColorState = {
  selectedBackgroundColor: DEFAULT_BACKGROUND_COLOR,
};

const colorStore = create<ColorState & ColorActions>()((set) => ({
  ...initialState,
  actions: {
    selectBackgroundColor: (hexCode) =>
      set((state) => ({
        selectedBackgroundColor:
          state.selectedBackgroundColor === hexCode
            ? DEFAULT_BACKGROUND_COLOR
            : hexCode,
      })),
  },
}));

export const useSelectedBackgroundColor = () =>
  colorStore((state) => state.selectedBackgroundColor);
export const useColorActions = () => colorStore((state) => state.actions);
