export type WithDataTestId<T = unknown> = T & {
  "data-testid"?: string;
};
