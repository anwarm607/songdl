import { StateCreator } from 'zustand';
import type { CombinedStoreState, ThemeSlice } from '../types';
import { lightColors, darkColors } from '../../theme/colors';

export type { ThemeSlice } from '../types';

export type ThemeMode = 'light' | 'dark' | 'system';

const getThemeColors = (
  mode: ThemeMode,
  systemColorScheme?: 'light' | 'dark' | null | 'unspecified',
): typeof lightColors => {
  if (mode === 'system') {
    return systemColorScheme === 'dark' ? darkColors : lightColors;
  }
  return mode === 'dark' ? darkColors : lightColors;
};

export const createThemeSlice: StateCreator<
  CombinedStoreState,
  [['zustand/immer', never]],
  [],
  ThemeSlice
> = (set, get) => ({
  themeMode: 'system',
  colors: lightColors,

  setThemeMode: (mode: ThemeMode, systemColorScheme?: 'light' | 'dark' | null | 'unspecified') => {
    set((state: CombinedStoreState) => {
      state.themeMode = mode;
      state.colors = getThemeColors(mode, systemColorScheme);
    });
  },

  initializeTheme: (systemColorScheme?: 'light' | 'dark' | null | 'unspecified') => {
    const currentMode = get().themeMode;
    const colors = getThemeColors(currentMode, systemColorScheme);
    
    set((state: CombinedStoreState) => {
      state.colors = colors;
    });
  },
});

