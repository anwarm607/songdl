import { useEffect, useRef } from 'react';
import { Animated, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { DownloadIcon } from '../../assets/icons/DownloadIcon';
import { Button } from '../Button';
import { buttonSizes, ButtonSizesKeys } from '../Button/constants';
import { lightColors } from '../../theme';
import { Text } from '../Text';
import { styles } from './styles';

type DownloadState = 'idle' | 'downloading' | 'completed' | 'error';

interface IDownloadButton {
  onPress: () => void;
  progress?: number; // 0 - 100
  state?: DownloadState;
  size?: ButtonSizesKeys;
}

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

export const DownloadButton = ({
  onPress,
  progress = 0,
  state = 'idle',
  size = 'm'
}: IDownloadButton) => {
  const colors = lightColors;

  const buttonSize = buttonSizes[size].height;
  const BORDER_WIDTH = 2;
  const RADIUS = (buttonSize - BORDER_WIDTH) / 2;
  const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

  const animatedProgressRef = useRef(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(animatedProgressRef.current, {
      toValue: progress,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const isDownloading = state === 'downloading';

  const strokeDashoffset = animatedProgressRef.current.interpolate({
    inputRange: [0, 100],
    outputRange: [CIRCUMFERENCE, 0],
  });

  return (
    <Button
      onPress={onPress}
      shape="circle"
      variant="icon"
      borderWidth={2}
      size={size}
      disabled={isDownloading}
    >
      <View
        style={[styles.container, { width: buttonSize, height: buttonSize }]}
      >
        <Svg
          width={buttonSize}
          height={buttonSize}
          viewBox={`0 0 ${buttonSize} ${buttonSize}`}
          style={styles.svg}
        >
          {isDownloading && (
            <AnimatedCircle
              stroke={colors.primary}
              fill="none"
              cx={buttonSize / 2}
              cy={buttonSize / 2}
              r={RADIUS}
              strokeWidth={BORDER_WIDTH}
              strokeDasharray={`${CIRCUMFERENCE} ${CIRCUMFERENCE}`}
              strokeDashoffset={strokeDashoffset as any}
              strokeLinecap="round"
              transform={`rotate(-90 ${buttonSize / 2} ${buttonSize / 2})`}
            />
          )}
        </Svg>

        <View style={styles.iconContainer}>
          {isDownloading ? (
            <Text variant="captionSmall" color="textSecondary">
              {Math.round(progress)}%
            </Text>
          ) : (
            <DownloadIcon />
          )}
        </View>
      </View>
    </Button>
  );
};
