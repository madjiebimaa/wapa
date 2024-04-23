export type Color = {
  id: string;
  name: string;
  code: string;
  hexCode: string;
};

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export type XYZ = {
  x: number;
  y: number;
  z: number;
};

export type CMYK = {
  c: number;
  m: number;
  y: number;
  k: number;
};

export interface Image extends File {
  id: string;
  preview: string | ArrayBuffer | null;
  dominantColorHexCode: string | null;
}

export type MatrixItem = {
  matrix: number[][];
  rowStartIndex: number;
  columnStartIndex: number;
  size: number;
};

export type Matrix = number[][];

export type GridItem = {
  gridRowStart: number;
  gridRowEnd: number;
  gridColumnStart: number;
  gridColumnEnd: number;
};

export type Grid = GridItem[];

export type Bubble = {
  color: Pick<Color, "id" | "hexCode">;
  position: GridItem;
};

export type ColorSortingOption =
  | "unsorted"
  | "ascending-name"
  | "descending-name"
  | "ascending-code"
  | "descending-code";

export type FilterColorArgs = {
  query?: Color["name"] | Color["code"];
  love?: boolean;
  sort?: ColorSortingOption;
};

export type GetClosestColorsArgs = {
  color: Color;
  comparedColors: Color[];
  n: number;
};

export type GenerateMatrixArgs = {
  size: number;
  itemSizes: number[];
  numberOfItems: number;
};

export type GenerateGridArgs = GenerateMatrixArgs;
