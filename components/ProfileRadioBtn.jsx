import React, { useEffect, useRef } from 'react';
import { View, Text, Image, TouchableOpacity, Animated } from 'react-native';
import { connect, useSelector } from 'react-redux';

import { COLORS, SIZES, FONTS } from '../constants';

const ProfileRadioBtn = ({ icon, label, isSelected, onPress }) => {
  const radioAnimated = useRef(new Animated.Value(0)).current;
  const appTheme = useSelector((state) => state.theme.appTheme);

  const circleColor = radioAnimated.interpolate({
    inputRange: [0, 17],
    outputRange: [COLORS.gray40, COLORS.primary],
  });

  const lineColor = radioAnimated.interpolate({
    inputRange: [0, 17],
    outputRange: [COLORS.additionalColor4, COLORS.additionalColor13],
  });

  useEffect(() => {
    if (isSelected) {
      Animated.timing(radioAnimated, {
        toValue: 17,
        duration: 300,
        useNativeDriver: false,
      }).start();
    } else {
      Animated.timing(radioAnimated, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
    }
  }, [isSelected]);

  return (
    <View
      style={{
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
      }}
    >
      {/* icon */}
      <View
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 20,
          backgroundColor: appTheme?.backgroundColor3,
        }}
      >
        <Image
          source={icon}
          resizeMode="contain"
          style={{
            width: 25,
            height: 25,
            tintColor: COLORS.primary,
          }}
        />
      </View>

      {/* label */}
      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}
      >
        <Text
          style={{
            color: appTheme?.textColor,
            ...FONTS.h3,
          }}
        >
          {label}
        </Text>
      </View>

      {/* radio btn */}
      <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        onPress={onPress}
      >
        <Animated.View
          style={{
            width: '100%',
            height: 5,
            borderRadius: 3,
            backgroundColor: lineColor, //animate
          }}
        />

        <Animated.View
          style={{
            position: 'absolute',
            left: radioAnimated, //animate
            width: 25,
            height: 25,
            borderRadius: 15,
            borderWidth: 5,
            borderColor: circleColor, //animate
            backgroundColor: appTheme?.backgroundColor1,
          }}
        />
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    appTheme: state.appTheme,
    error: state.error,
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {};
};

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileRadioBtn);
export default ProfileRadioBtn;
