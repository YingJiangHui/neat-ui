export const isObject = <T>(value: T): boolean =>
  value && !Array.isArray(value) && typeof value === 'object';
