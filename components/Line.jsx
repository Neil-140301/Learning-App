import React from 'react';
import { View, Text } from 'react-native';

import { COLORS } from '../constants';

const Line = ({ lineStyle }) => {
  return (
    <View
      style={{
        height: 2,
        width: '100%',
        backgroundColor: COLORS.gray10,
        ...lineStyle,
      }}
    />
  );
};

export default Line;
