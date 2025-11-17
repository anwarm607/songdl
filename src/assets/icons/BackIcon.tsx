import Svg, { Path } from 'react-native-svg';
import { useTheme } from '../../hooks/useTheme';
import { IconProps } from '../../shared/types/icon';

export const BackIcon = (props: IconProps) => {
  const { colors } = useTheme();
  const themeColor = colors[props.color || 'primary'];
  return (
    <Svg
      width={24}
      height={24}
      fill="none"
      viewBox="0 0 24 24"
      color={themeColor}
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      {...props}
    >
      <Path  d="m15 18-6-6 6-6" />
    </Svg>
  );
};
