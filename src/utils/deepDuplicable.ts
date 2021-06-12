import { isObject } from '@/utils/utils';
export const deepDuplicable = <T extends Record<string, unknown>>(
  source: T,
  target: T,
): T => {
  if (!isObject(source) || !isObject(target)) {
    return target;
  }
  return Object.keys(target).reduce((result, key) => {
    const sourceValue = source[key];
    const targetValue = target[key];
    if (Array.isArray(sourceValue) && Array.isArray(targetValue)) {
      return {
        ...result,
        [key]: [...new Set(sourceValue.concat(targetValue))],
      };
    } else if (isObject(sourceValue) && isObject(targetValue)) {
      return {
        ...result,
        [key]: deepDuplicable(sourceValue as T, targetValue as T),
      };
    } else {
      return { ...result, [key]: targetValue };
    }
  }, source);
};

export default deepDuplicable;
