import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import vinilexColors from "@/data/vinilex-colors.json";
import {
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_COLOR_SORTING_OPTION,
} from "@/lib/constants";
import { Color, FilterColorArgs } from "@/lib/types";
import { applyColorSorting } from "@/lib/utils";

type ColorState = {
  colors: Color[];
  selectedBackgroundColor: Color["hexCode"];
  lovedColors: Color["id"][];
  filteredColors: Color[];
};

type ColorActions = {
  actions: {
    selectBackgroundColor: (hexCode: Color["hexCode"]) => void;
    loveColor: (id: Color["id"]) => void;
    filterColors: (args: FilterColorArgs) => void;
  };
};

const initialState: ColorState = {
  colors: [...vinilexColors],
  selectedBackgroundColor: DEFAULT_BACKGROUND_COLOR,
  lovedColors: [],
  filteredColors: [...vinilexColors],
};

const colorStore = create<ColorState & ColorActions>()(
  persist(
    (set) => ({
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
            const hasLoved = state.lovedColors.includes(id);

            if (hasLoved) {
              return {
                lovedColors: state.lovedColors.filter(
                  (colorId) => colorId !== id,
                ),
              };
            }

            return {
              lovedColors: [...state.lovedColors, id],
            };
          }),
        filterColors: ({
          query = "",
          love,
          sort = DEFAULT_COLOR_SORTING_OPTION,
        }) =>
          set((state) => {
            let filteredColors = [...state.colors];

            if (love) {
              filteredColors = filteredColors.filter((color) =>
                state.lovedColors.includes(color.id),
              );
            }

            if (sort !== DEFAULT_COLOR_SORTING_OPTION) {
              filteredColors = applyColorSorting(filteredColors, sort);
            }

            if (query.length !== 0) {
              filteredColors = filteredColors.filter((color) => {
                const lowerCasedQuery = query.toLowerCase();

                return (
                  color.name.toLowerCase().includes(lowerCasedQuery) ||
                  color.code.toLowerCase().includes(lowerCasedQuery)
                );
              });
            }

            return {
              filteredColors,
            };
          }),
      },
    }),
    {
      name: "color-storage",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        colors: state.colors,
        selectedBackgroundColor: state.selectedBackgroundColor,
        lovedColors: state.lovedColors,
      }),
    },
  ),
);

export const useColors = () => colorStore((state) => state.colors);
export const useSelectedBackgroundColor = () =>
  colorStore((state) => state.selectedBackgroundColor);
export const useLovedColors = () => colorStore((state) => state.lovedColors);
export const useFilteredColors = () =>
  colorStore((state) => state.filteredColors);
export const useColorActions = () => colorStore((state) => state.actions);
