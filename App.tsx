import { useEffect } from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { QueryClientProvider } from '@tanstack/react-query';
import { RootNavigator } from './src/navigation';
import { queryClient } from './src/config/queryClient';
import { useStore } from './src/store';

function App() {
  const systemColorScheme = useColorScheme();
  const { initializeTheme, themeMode } = useStore();

  useEffect(() => {
    initializeTheme(systemColorScheme);
  }, [systemColorScheme, initializeTheme]);

  const isDarkMode = themeMode === 'dark' || (themeMode === 'system' && systemColorScheme === 'dark');

  if (__DEV__) {
    require("./ReactotronConfig");
  }

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigator />
      </SafeAreaProvider>
    </QueryClientProvider>
  );
}

export default App;
