import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { connect, useSelector } from 'react-redux';

import { COLORS, SIZES, FONTS, icons } from '../constants';

const ProfileValue = ({ icon, label, value, onPress }) => {
  const appTheme = useSelector((state) => state.theme.appTheme);
  return (
    <TouchableOpacity
      style={{
        flexDirection: 'row',
        height: 80,
        alignItems: 'center',
      }}
      onPress={onPress}
    >
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

      <View
        style={{
          flex: 1,
          marginLeft: SIZES.radius,
        }}
      >
        {label && (
          <Text
            style={{
              color: COLORS.gray30,
              ...FONTS.body3,
            }}
          >
            {label}
          </Text>
        )}

        {value && (
          <Text
            style={{
              color: appTheme?.textColor,
              ...FONTS.h3,
            }}
          >
            {value}
          </Text>
        )}
      </View>

      <Image
        source={icons.right_arrow}
        style={{
          width: 15,
          height: 15,
          tintColor: appTheme?.tintColor,
        }}
      />
    </TouchableOpacity>
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

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileValue);
export default ProfileValue;
