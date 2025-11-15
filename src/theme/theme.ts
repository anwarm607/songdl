import { lightColors, darkColors, Colors } from './colors';

export interface Theme {
  colors: Colors;
}

export const lightTheme: Theme = {
  colors: lightColors,
};

export const darkTheme: Theme = {
  colors: darkColors,
};

export type { Colors };
