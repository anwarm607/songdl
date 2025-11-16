import { ReactNode } from 'react';
import { ColorKeys } from '../../theme';
import { StyleProp, ViewStyle } from 'react-native';

export interface CardProps {
  bgColor?: ColorKeys;
  borderRadius?: number;
  center?: boolean;
  children?: ReactNode;
  ph?: number;
  pv?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  borderWidth?: number;
  borderColor?: ColorKeys;
}
