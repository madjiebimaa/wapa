export type Color = {
  id: string;
  name: string;
  code: string;
  hexCode: string;
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
