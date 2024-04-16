import { create } from "zustand";

import { DEFAULT_BACKGROUND_COLOR } from "@/lib/constants";
import { Color } from "@/lib/types";

type ColorState = {
  selectedBackgroundColor: Color["hexCode"];
  lovedColors: Color["id"][];
};

type ColorActions = {
  actions: {
    selectBackgroundColor: (hexCode: Color["hexCode"]) => void;
    loveColor: (id: Color["id"]) => void;
  };
};

const initialState: ColorState = {
  selectedBackgroundColor: DEFAULT_BACKGROUND_COLOR,
  lovedColors: [],
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
    loveColor: (id) =>
      set((state) => {
        const hasLoved = Boolean(
          state.lovedColors.find((colorId) => colorId === id),
        );

        if (hasLoved) {
          return {
            lovedColors: state.lovedColors.filter((colorId) => colorId !== id),
          };
        }

        return {
          lovedColors: [...state.lovedColors, id],
        };
      }),
  },
}));

export const useSelectedBackgroundColor = () =>
  colorStore((state) => state.selectedBackgroundColor);
export const useLovedColors = () => colorStore((state) => state.lovedColors);
export const useColorActions = () => colorStore((state) => state.actions);
