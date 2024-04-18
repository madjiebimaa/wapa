import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Color, ColorSortingOption, RGB } from "@/lib/types";

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

function hexCodeToRGB(hexCode: string): RGB {
  const formattedHexCode = hexCode.replace("#", "");
  const baseNumber = 16;

  const r = parseInt(formattedHexCode.slice(0, 2), baseNumber);
  const g = parseInt(formattedHexCode.slice(2, 4), baseNumber);
  const b = parseInt(formattedHexCode.slice(4, 6), baseNumber);

  return { r, g, b };
}

export function toGrayScale({ r, g, b }: RGB) {
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

export function getOppositeContrast(
  hexCode: string,
): "text-foreground" | "text-background" {
  return toGrayScale(hexCodeToRGB(hexCode)) > 128
    ? "text-foreground"
    : "text-background";
}
