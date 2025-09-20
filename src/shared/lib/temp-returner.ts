export const tempReturner = (payload: string): number => {
  if (payload === "fast") {
    return 0.3;
  } else if (payload === "clever") {
    return 0.7;
  } else {
    return 0.5;
  }
};
