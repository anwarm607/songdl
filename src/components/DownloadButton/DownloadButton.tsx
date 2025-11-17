import { useEffect, useMemo, useRef } from 'react';
import { Animated, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { DownloadIcon } from '../../assets/icons/DownloadIcon';
import { Button } from '../Button';
import { buttonSizes, ButtonSizesKeys } from '../Button/constants';
import { useTheme } from '../../hooks/useTheme';
import { Text } from '../Text';
import { styles } from './styles';
import { FolderIcon } from '../../assets/icons/FolderIcon';
import { UI_CONSTANTS } from '../../shared/constants/ui';

interface IDownloadButton {
  onPress: () => void;
  progress?: number; // 0 - 100
  isDownloading: boolean;
  isDownloaded: boolean;
  size?: ButtonSizesKeys;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const DownloadButton = ({
  onPress,
  progress = 0,
  isDownloading = false,
  size = 'm',
  isDownloaded = false,
}: IDownloadButton) => {
  const { colors } = useTheme();

  const buttonSize = buttonSizes[size].height;
  const borderWidth = UI_CONSTANTS.BUTTON_BORDER_WIDTH;
  const radius = useMemo(() => (buttonSize - borderWidth) / 2, [buttonSize, borderWidth]);
  const circumference = useMemo(() => 2 * Math.PI * radius, [radius]);
  const centerPosition = useMemo(() => buttonSize / 2, [buttonSize]);
  const roundedProgress = useMemo(() => Math.round(progress), [progress]);

  const animatedProgressRef = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedProgressRef.current, {
      toValue: progress,
      duration: UI_CONSTANTS.PROGRESS_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const strokeDashoffset = animatedProgressRef.current.interpolate({
    inputRange: [0, 100],
    outputRange: [circumference, 0],
  });

  const containerStyle = useMemo(
    () => [styles.container, { width: buttonSize, height: buttonSize }],
    [buttonSize],
  );

  const svgViewBox = useMemo(() => `0 0 ${buttonSize} ${buttonSize}`, [buttonSize]);
  const circleTransform = useMemo(
    () => `rotate(-90 ${centerPosition} ${centerPosition})`,
    [centerPosition],
  );
  const strokeDasharray = useMemo(
    () => `${circumference} ${circumference}`,
    [circumference],
  );

  const renderContent = () => {
    if (isDownloaded) {
      return <FolderIcon />;
    }

    return (
      <>
        <Svg width={buttonSize} height={buttonSize} viewBox={svgViewBox} style={styles.svg}>
          {isDownloading && (
            <AnimatedCircle
              stroke={colors.primary}
              fill="none"
              cx={centerPosition}
              cy={centerPosition}
              r={radius}
              strokeWidth={borderWidth}
              strokeDasharray={strokeDasharray}
              strokeDashoffset={strokeDashoffset as any}
              strokeLinecap="round"
              transform={circleTransform}
            />
          )}
        </Svg>

        <View style={styles.iconContainer}>
          {isDownloading ? (
            <Text variant="captionSmall" color="textSecondary">
              {roundedProgress}%
            </Text>
          ) : (
            <DownloadIcon />
          )}
        </View>
      </>
    );
  };

  return (
    <Button
      onPress={onPress}
      shape="circle"
      variant="icon"
      borderWidth={borderWidth}
      size={size}
      disabled={isDownloading}
    >
      <View style={containerStyle}>{renderContent()}</View>
    </Button>
  );
};
