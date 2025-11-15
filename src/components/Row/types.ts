import { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";

export interface IRow {
  baseline?: boolean;
  center?: boolean;
  children: ReactNode;
  gap?: number;
  isFlexWrap?: boolean;
  isSpaceAround?: boolean;
  isSpaceBetween?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
