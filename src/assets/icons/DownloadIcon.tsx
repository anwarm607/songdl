import Svg, { Path } from 'react-native-svg';
import { lightColors } from '../../theme';
import { IconProps } from '../../shared/types/icon';

export const DownloadIcon = (props: IconProps) => {
  const colors = lightColors;
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
      <Path d="M12 5v14M19 12l-7 7-7-7" />
    </Svg>
  );
};
