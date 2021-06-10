import lightTheme from '@/themes/presets/default';
import darkTheme from '@/themes/presets/dark';
import { NeatUITheme } from '@/themes/presets';
import deepDuplicable from '@/utils/deepDuplicable';
export type UserTheme = DeepPartial<NeatUITheme> & { type: string };
export const getDefaultPreset = () => {
  return lightTheme;
};

export const getPresets = () => {
  return [lightTheme, darkTheme];
};

export const isAvailableThemeType = (type: NeatUITheme['type']) => {
  return !getPresets().find((theme) => theme.type === type);
};
export const createTheme = (base: NeatUITheme, custom: UserTheme) => {
  if (!isAvailableThemeType(custom.type)) {
    throw new Error('不可以使用已经存在的主题类型');
  }
  return deepDuplicable(base, custom) as NeatUITheme;
};
export const Themes = {
  getDefaultPreset,
  getPresets,
  createTheme,
};
export default {
  getDefaultPreset,
  getPresets,
  createTheme,
};
