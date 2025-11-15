import React from 'react';
import {StyleProp, View, ViewStyle} from 'react-native';

import {IRow} from './types';


export const Row = ({
  baseline,
  center,
  children,
  gap,
  isFlexWrap,
  isSpaceAround,
  isSpaceBetween,
  style,
  testID,
}: IRow) => {
  const constructStyle: StyleProp<ViewStyle> = {
    ...(gap && {gap: gap}),
    ...(isSpaceBetween && {justifyContent: 'space-between'}),
    ...(isFlexWrap && {flexWrap: 'wrap'}),
    ...(center && {alignItems: 'center'}),
    ...(baseline && {alignItems: 'baseline'}),
    ...(isSpaceAround && {justifyContent: 'space-around'}),
    flexDirection: 'row',
  };

  return (
    <View style={[constructStyle, style]} testID={testID}>
      {children}
    </View>
  );
};
