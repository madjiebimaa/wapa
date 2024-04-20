import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  CMYK,
  Color,
  ColorSortingOption,
  GenerateGridArgs,
  GenerateMatrixArgs,
  GetClosestColorsArgs,
  Grid,
  Matrix,
  MatrixItem,
  RGB,
  XYZ,
} from "@/lib/types";

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

export function hexCodeToRgb(hexCode: string): RGB {
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
  return toGrayScale(hexCodeToRgb(hexCode)) > 128
    ? "text-foreground"
    : "text-background";
}

function numberToHexCode(num: number) {
  const hex = num.toString(16);
  return hex.length === 1 ? `0${hex}` : hex;
}

export function rgbToHexCode({ r, g, b }: RGB): string {
  const rHexCode = numberToHexCode(r);
  const gHexCode = numberToHexCode(g);
  const bHexCode = numberToHexCode(b);

  return `#${rHexCode}${gHexCode}${bHexCode}`;
}

function normalizeRgb({ r, g, b }: RGB) {
  return { nr: r / 255, ng: g / 255, nb: b / 255 };
}

function rgbToXyz(rgb: RGB) {
  const { nr, ng, nb } = normalizeRgb(rgb);

  const x = 0.4124564 * nr + 0.3575761 * ng + 0.1804375 * nb;
  const y = 0.2126729 * nr + 0.7151522 * ng + 0.072175 * nb;
  const z = 0.0193339 * nr + 0.119192 * ng + 0.9503041 * nb;

  return { x, y, z };
}

function normalizeXyz({ x, y, z }: XYZ) {
  return { nx: x / 0.9642, ny: y / 1.0, nz: z / 0.8249 };
}

function xyzValueToLabColorSpace(normalizeValue: number) {
  return normalizeValue > 0.008856
    ? Math.pow(normalizeValue, 1 / 3)
    : (903.3 * normalizeValue + 16) / 116;
}

function xyzToLab(xyz: XYZ) {
  const { nx, ny, nz } = normalizeXyz(xyz);

  const fx = xyzValueToLabColorSpace(nx);
  const fy = xyzValueToLabColorSpace(ny);
  const fz = xyzValueToLabColorSpace(nz);

  const L = Math.max(0, 116 * fy - 16);
  const a = (fx - fy) * 500;
  const b = (fy - fz) * 200;

  return { L, a, b };
}

function rgbToLab(rgb: RGB) {
  const xyz = rgbToXyz(rgb);
  return xyzToLab(xyz);
}

export function rgbToCmyk(rgb: RGB): CMYK {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const k = 1 - Math.max(r, g, b);
  const c = (1 - r - k) / (1 - k);
  const m = (1 - g - k) / (1 - k);
  const y = (1 - b - k) / (1 - k);

  return {
    c: Math.round(c * 100),
    m: Math.round(m * 100),
    y: Math.round(y * 100),
    k: Math.round(k * 100),
  };
}

export function cmykToRgb({ c, m, y, k }: CMYK): RGB {
  const r = 255 * (1 - c) * (1 - k);
  const g = 255 * (1 - m) * (1 - k);
  const b = 255 * (1 - y) * (1 - k);

  return { r, g, b };
}

function colorDistance(rgb: RGB, comparedRgb: RGB) {
  const { L, a, b } = rgbToLab(rgb);
  const { L: comparedL, a: comparedA, b: comparedB } = rgbToLab(comparedRgb);

  return Math.sqrt(
    Math.pow(L - comparedL, 2) +
      Math.pow(a - comparedA, 2) +
      Math.pow(b - comparedB, 2),
  );
}

export function getClosestColors({
  color,
  comparedColors,
  n = 5,
}: GetClosestColorsArgs) {
  return comparedColors
    .filter((comparedColor) => comparedColor.id !== color.id)
    .map((comparedColor) => ({
      ...comparedColor,
      distance: colorDistance(
        hexCodeToRgb(color.hexCode),
        hexCodeToRgb(comparedColor.hexCode),
      ),
    }))
    .sort((a, b) => a.distance - b.distance)
    .slice(0, n);
}

function generateEmptyMatrix(size: number): Matrix {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(0));
}

export function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function insertItemIntoMatrix(
  { rowStartIndex, columnStartIndex, size }: MatrixItem,
  matrix: Matrix,
) {
  for (let row = rowStartIndex; row < rowStartIndex + size; row++) {
    for (let col = columnStartIndex; col < columnStartIndex + size; col++) {
      matrix[row][col] = size;
    }
  }

  return matrix;
}

function generateItem(size: number, matrixSize: number): MatrixItem {
  const matrix = generateEmptyMatrix(matrixSize);

  const rowStartIndex = getRandomInt(0, matrixSize - size);
  const columnStartIndex = getRandomInt(0, matrixSize - size);

  const insertedMatrix = insertItemIntoMatrix(
    { rowStartIndex, columnStartIndex, size, matrix },
    matrix,
  );

  return { rowStartIndex, columnStartIndex, size, matrix: insertedMatrix };
}

export function isHexCode(hexCode: string): boolean {
  return hexCode.length === 7;
}

function isItemOverlap(item: MatrixItem | null, matrix: Matrix) {
  if (item === null) {
    return true;
  }

  let isOverlap = false;

  for (
    let row = item.rowStartIndex;
    row < item.rowStartIndex + item.size;
    row++
  ) {
    for (
      let col = item.columnStartIndex;
      col < item.columnStartIndex + item.size;
      col++
    ) {
      if (matrix[row][col] !== 0) {
        isOverlap = true;
      }
    }
  }

  return isOverlap;
}

function generateMatrix({
  size,
  itemSizes,
  numberOfItems,
}: GenerateMatrixArgs) {
  let matrix = generateEmptyMatrix(size);

  for (let index = 0; index < numberOfItems; index++) {
    let item: MatrixItem | null = null;

    while (isItemOverlap(item, matrix)) {
      const candidateItem = generateItem(itemSizes[index], matrix.length);
      item = candidateItem;
    }

    matrix = insertItemIntoMatrix(item!, matrix);
  }

  return matrix;
}

function removeItemFromMatrix(item: MatrixItem, matrix: Matrix) {
  for (
    let row = item.rowStartIndex;
    row < item.rowStartIndex + item.size;
    row++
  ) {
    for (
      let col = item.columnStartIndex;
      col < item.columnStartIndex + item.size;
      col++
    ) {
      matrix[row][col] = 0;
    }
  }

  return matrix;
}

export function generateGrid(args: GenerateGridArgs) {
  let matrix = generateMatrix(args);
  const grid: Grid = [];

  for (let row = 0; row < matrix.length; row++) {
    for (let col = 0; col < matrix[row].length; col++) {
      if (matrix[row][col] !== 0) {
        const size = matrix[row][col];

        const gridRowStart = row + 1;
        const gridRowEnd = row + size + 1;
        const gridColumnStart = col + 1;
        const gridColumnEnd = col + size + 1;

        matrix = removeItemFromMatrix(
          {
            rowStartIndex: row,
            columnStartIndex: col,
            size,
            matrix: generateEmptyMatrix(matrix.length),
          },
          matrix,
        );

        grid.push({ gridRowStart, gridRowEnd, gridColumnStart, gridColumnEnd });
      }
    }
  }

  return grid;
}

export function getRgbAttribute(
  name: "r" | "g" | "b",
): "rgb.r" | "rgb.g" | "rgb.b" {
  return `rgb.${name}`;
}

export function getCmykAttribute(
  name: "c" | "m" | "y" | "k",
): "cmyk.c" | "cmyk.m" | "cmyk.y" | "cmyk.k" {
  return `cmyk.${name}`;
}
