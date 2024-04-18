import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Color, ColorSortingOption, RGB, XYZ } from "@/lib/types";

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

export function hexCodeToRGB(hexCode: string): RGB {
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

function numberToHexCode(num: number) {
  const hex = num.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function RGBToHexCode({ r, g, b }: RGB): string {
  const rHexCode = numberToHexCode(r);
  const gHexCode = numberToHexCode(g);
  const bHexCode = numberToHexCode(b);

  return `#${rHexCode}${gHexCode}${bHexCode}`;
}

function normalizeRGB({ r, g, b }: RGB) {
  return { nr: r / 255, ng: g / 255, nb: b / 255 };
}

function RGBToXYZ(rgb: RGB) {
  const { nr, ng, nb } = normalizeRGB(rgb);

  const x = 0.4124564 * nr + 0.3575761 * ng + 0.1804375 * nb;
  const y = 0.2126729 * nr + 0.7151522 * ng + 0.072175 * nb;
  const z = 0.0193339 * nr + 0.119192 * ng + 0.9503041 * nb;

  return { x, y, z };
}

function normalizeXYZ({ x, y, z }: XYZ) {
  return { nx: x / 0.9642, ny: y / 1.0, nz: z / 0.8249 };
}

function XYZValueToLabColorSpace(normalizeValue: number) {
  return normalizeValue > 0.008856
    ? Math.pow(normalizeValue, 1 / 3)
    : (903.3 * normalizeValue + 16) / 116;
}

function XYZToLab(xyz: XYZ) {
  const { nx, ny, nz } = normalizeXYZ(xyz);

  const fx = XYZValueToLabColorSpace(nx);
  const fy = XYZValueToLabColorSpace(ny);
  const fz = XYZValueToLabColorSpace(nz);

  const L = Math.max(0, 116 * fy - 16);
  const a = (fx - fy) * 500;
  const b = (fy - fz) * 200;

  return { L, a, b };
}

function RGBToLab(rgb: RGB) {
  const xyz = RGBToXYZ(rgb);
  return XYZToLab(xyz);
}

function colorDistance(rgb: RGB, comparedRgb: RGB) {
  const { L, a, b } = RGBToLab(rgb);
  const { L: comparedL, a: comparedA, b: comparedB } = RGBToLab(comparedRgb);

  return Math.sqrt(
    Math.pow(L - comparedL, 2) +
      Math.pow(a - comparedA, 2) +
      Math.pow(b - comparedB, 2),
  );
}

export function getClosestColors(
  color: Color,
  comparedColors: Color[],
  n: number = 5,
) {
  return comparedColors
    .filter((comparedColor) => comparedColor.id !== color.id)
    .map((comparedColor) => ({
      ...comparedColor,
      distance: colorDistance(
        hexCodeToRGB(color.hexCode),
        hexCodeToRGB(comparedColor.hexCode),
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, n);
}
