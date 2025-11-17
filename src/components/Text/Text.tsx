import React from 'react';
import { Text as RNText, StyleProp, TextProps, TextStyle } from 'react-native';

import { ColorKeys } from '../../theme';
import { typography, TypographyKey } from '../../theme/typography';
import { useTheme } from '../../hooks/useTheme';

interface ITextProps extends TextProps {
  color?: ColorKeys;
  textStyle?: StyleProp<TextStyle>;
  variant?: TypographyKey;
}

export const Text = (props: ITextProps) => {
  const {
    children,
    color = 'text',
    testID,
    style,
    variant,
  } = props;

  const { colors } = useTheme();

  const textColor = colors[color];
  const variantStyle = typography[variant ?? 'bodyMedium'];

  return (
    <RNText
      {...props}
      style={[{ color: textColor }, variantStyle, style]}
      testID={testID}
    >
      {children}
    </RNText>
  );
};
