import { useStore } from '../store';

/**
 * Hook to access theme colors from the Zustand store
 * Automatically updates when theme changes
 */
export const useTheme = () => {
  const colors = useStore(state => state.colors);
  const themeMode = useStore(state => state.themeMode);
  const setThemeMode = useStore(state => state.setThemeMode);

  return {
    colors,
    themeMode,
    setThemeMode,
  };
};

