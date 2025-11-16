import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SongListScreen } from '../screens';
import { lightColors, typography } from '../theme';
import { RootStackParamList } from './types';
import { SongDetailsScreen } from '../screens/SongDetailsScreen/SongDetailsScreen';
import { InitialNavHeader } from './InitialNavHeader';

const Stack = createNativeStackNavigator<RootStackParamList>();

export const RootNavigator: React.FC = () => {
  const isDark = useColorScheme() === 'dark';
  const colors = lightColors;

  return (
    <>
      <StatusBar
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={colors.background}
      />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: true,
            contentStyle: {
              backgroundColor: colors.background,
            },

            headerStyle: {
              backgroundColor: colors.surface,
            },
            headerTintColor: colors.text,
            headerTitleStyle: {
              ...typography.titleLarge,
            },
          }}
        >
          <Stack.Screen
            name="SongList"
            component={SongListScreen}
            options={{
              title: 'Songs',
              header: InitialNavHeader,
            }}
          />
          <Stack.Screen
            name="SongDetails"
            component={SongDetailsScreen}
            options={{
              title: '',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
