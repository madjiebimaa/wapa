import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Color, ColorSortingOption } from "@/lib/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function applyColorSorting(
  colors: Color[],
  sortingOption: ColorSortingOption,
) {
  let sortedColors = [...colors];

  switch (sortingOption) {
    case "ascending-name":
      return sortedColors.sort((a, b) => (a.name < b.name ? 1 : -1));
    case "descending-name":
      return sortedColors.sort((a, b) => (a.name < b.name ? -1 : 1));
    case "ascending-code":
      return sortedColors.sort((a, b) => (a.code < b.code ? 1 : -1));
    case "descending-code":
      return sortedColors.sort((a, b) => (a.code < b.code ? -1 : 1));
    default:
      return sortedColors;
  }
}
