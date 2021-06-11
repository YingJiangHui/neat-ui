export const deepDuplicable = <T extends Record<string, unknown>>(
  source: T,
  target: T,
): T => {
  // TODO
  return target;
};

export default deepDuplicable;
