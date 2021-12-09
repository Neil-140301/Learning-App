import React from 'react';
import { TouchableOpacity, Text, ImageBackground } from 'react-native';

import { COLORS, SIZES, FONTS } from '../constants';

const CategoryCard = ({ category, containerStyle }) => {
  return (
    <TouchableOpacity>
      <ImageBackground
        source={category?.thumbnail}
        resizeMode="cover"
        style={{
          height: 150,
          width: 200,
          paddingHorizontal: SIZES.radius,
          paddingVertical: SIZES.padding,
          justifyContent: 'flex-end',
          ...containerStyle,
        }}
        imageStyle={{ borderRadius: SIZES.radius }}
      >
        <Text style={{ color: COLORS.white, ...FONTS.h2 }}>
          {category.title}
        </Text>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default CategoryCard;
