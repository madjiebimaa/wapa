export type Color = {
  id: string;
  name: string;
  code: string;
  hexCode: string;
};

export type FilterColorArgs = {
  query?: Color["name"] | Color["code"];
  love?: boolean;
};
