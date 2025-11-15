import { ReactNode } from 'react';
import { Colors } from '../../theme';
import { StyleProp, ViewStyle } from 'react-native';

export interface CardProps {
  bgColor?: keyof Colors;
  borderRadius?: number;
  center?: boolean;
  children?: ReactNode;
  ph?: number;
  pv?: number;
  style?: StyleProp<ViewStyle>;
  testID?: string;
  borderWidth?: number;
  borderColor?: keyof Colors;
}
