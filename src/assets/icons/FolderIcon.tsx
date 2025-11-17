import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { IconProps } from '../../shared/types/icon';

export const FolderIcon = (props: IconProps) => {
  const { colors } = useTheme();
  const themeColor = colors[props.color || 'primary'];
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      color={themeColor}
      {...props}
    >
      <Path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
    </Svg>
  );
};
