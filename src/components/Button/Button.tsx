import { StyleSheet, TouchableOpacity } from 'react-native';
import { ReactNode } from 'react';
import { buttonSizes, ButtonSizesKeys } from './constants';
import { useTheme } from '../../hooks/useTheme';
import { styles } from './styles';
import { ColorKeys } from '../../theme';

interface IButton {
  shape: 'rectangle' | 'rounded' | 'circle';
  variant: 'primary' | 'secondary' | 'transparent' | 'icon';
  onPress: () => void;
  children: ReactNode;
  size?: ButtonSizesKeys;
  borderWidth?: number;
  borderColor?: ColorKeys;
  disabled?: boolean;
}

export const Button = (props: IButton) => {
  const {
    shape = 'rounded',
    variant = 'primary',
    onPress,
    children,
    size = 'm',
    borderWidth = 0,
    borderColor = 'border',
    disabled
  } = props;
  const { colors } = useTheme();
  const getShapeStyles = () => {
    const sizeConfig = buttonSizes[size];
    if (shape === 'circle') {
      return {
        ...sizeConfig,
        width: sizeConfig.height,
        borderRadius: sizeConfig.height / 2,
      };
    } else if (shape === 'rectangle') {
      return {
        ...sizeConfig,
        borderRadius: 0,
      };
    } else {
      return sizeConfig;
    }
  };

  const getVariantStyles = () => {
    if (variant === 'primary') {
      return {
        backgroundColor: colors.primary,
        color: colors.textWhite,
      };
    } else if (variant === 'secondary') {
      return {
        backgroundColor: colors.secondary,
        color: colors.textWhite,
      };
    } else if (variant === 'transparent') {
      return {
        backgroundColor: 'transparent',
        color: colors.text,
      };
    } else if (variant === 'icon') {
      return {
        backgroundColor: 'transparent',
        borderWidth: 2,
        color: colors.primary,
      };
    }
  };

  const shapeStyle = getShapeStyles();
  const variantStyle = getVariantStyles();
  const buttonStyles = StyleSheet.flatten([
    styles.container,
    shapeStyle,
    variantStyle,
    {
      borderWidth,
      borderColor: colors[borderColor]
    }
  ]);
  return (
    <TouchableOpacity onPress={onPress} style={buttonStyles} disabled={disabled}>
      {children}
    </TouchableOpacity>
  );
};
