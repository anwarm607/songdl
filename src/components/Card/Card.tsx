import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import { CardProps } from './types';
import { useTheme } from '../../hooks/useTheme';


export const Card = ({
  bgColor = 'surface',
  borderRadius = 8,
  center = false,
  children,
  ph,
  pv,
  style,
  borderWidth,
  borderColor = 'surface',
  testID = 'card-test-id',
}: CardProps) => {
  const { colors } = useTheme();

  const background = colors[bgColor];

  const themedBorderColor = colors[borderColor]

  const centerAlign: StyleProp<ViewStyle> = center
    ? {alignItems: 'center', justifyContent: 'center'}
    : {};

  return (
    <View
      style={[
        {
          backgroundColor: background,
          paddingHorizontal: ph,
          paddingVertical: pv,
          borderRadius: borderRadius,
          borderWidth: borderWidth,
          borderColor: themedBorderColor,
          ...centerAlign,
        },
        style,
      ]}
      testID={testID}>
      {children}
    </View>
  );
};
