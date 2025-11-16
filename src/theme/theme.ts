import { lightColors, darkColors } from './colors';

export type ColorKeys = keyof typeof lightColors;

export type Colors =  typeof lightColors;
export interface Theme {
  colors: Colors;
}

export const lightTheme: Theme = {
  colors: lightColors,
};

export const darkTheme: Theme = {
  colors: darkColors,
};

