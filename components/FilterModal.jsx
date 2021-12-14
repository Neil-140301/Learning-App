import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';

import Animated, {
  interpolate,
  useAnimatedStyle,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import TextButton from './TextButton';
import Line from './Line';

import { COLORS, SIZES, FONTS, icons, constants } from '../constants';
import TwoPointSlider from './TwoPointSlider';

const ClassTypeOption = ({
  containerStyle,
  classType,
  isSelected,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={{
        flex: 1,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: SIZES.radius,
        borderRadius: SIZES.radius,
        backgroundColor: isSelected ? COLORS.primary3 : COLORS.additionalColor9,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      <Image
        source={classType.icon}
        resizeMode="contain"
        style={{
          width: 40,
          height: 40,
          tintColor: isSelected ? COLORS.white : COLORS.gray80,
        }}
      />

      <Text
        style={{
          marginTop: SIZES.base,
          color: isSelected ? COLORS.white : COLORS.gray80,
          ...FONTS.h3,
        }}
      >
        {classType.label}
      </Text>
    </TouchableOpacity>
  );
};

const ClassLevelOption = ({
  containerStyle,
  classLevel,
  isLastItem,
  isSelected,
  onPress,
}) => {
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          height: 50,
          ...containerStyle,
        }}
        onPress={onPress}
      >
        <Text
          style={{
            flex: 1,
            ...FONTS.body3,
          }}
        >
          {classLevel.label}
        </Text>

        <Image
          source={isSelected ? icons.checkbox_on : icons.checkbox_off}
          resizeMode="contain"
          style={{
            width: 20,
            height: 20,
          }}
        />
      </TouchableOpacity>
      {!isLastItem && (
        <Line
          lineStyle={{
            height: 1,
          }}
        />
      )}
    </>
  );
};

const FilterModal = ({ filterModalSharedValue1, filterModalSharedValue2 }) => {
  const [classType, setClassType] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [createdWithin, setCreatedWithin] = useState('');

  const filterModalContainerAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue1.value,
        [SIZES.height, 0],
        [0, 1]
      ),
      transform: [
        {
          translateY: filterModalSharedValue1.value,
        },
      ],
    };
  });

  const filterModalBgAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue2.value,
        [SIZES.height, 0],
        [0, 1]
      ),
    };
  });

  const filterModalContentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        filterModalSharedValue2.value,
        [SIZES.height, 0],
        [0, 1]
      ),
      transform: [
        {
          translateY: filterModalSharedValue2.value,
        },
      ],
    };
  });

  const renderFooter = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          height: 50,
          marginBottom: 30,
          paddingHorizontal: SIZES.padding,
        }}
      >
        <TextButton
          label="Reset"
          containerStyle={{
            flex: 1,
            borderRadius: SIZES.radius,
            borderWidth: 1,
            backgroundColor: null,
          }}
          labelStyle={{
            color: COLORS.black,
            ...FONTS.h3,
          }}
        />
        <TextButton
          label="Apply"
          containerStyle={{
            flex: 1,
            marginLeft: SIZES.radius,
            borderRadius: SIZES.radius,
            borderWidth: 2,
            borderColor: COLORS.primary,
            backgroundColor: COLORS.primary,
          }}
          labelStyle={{
            color: COLORS.white,
            ...FONTS.h3,
          }}
        />
      </View>
    );
  };

  return (
    // main container
    <Animated.View
      style={[
        {
          position: 'absolute',
          bottom: 0,
          height: SIZES.height,
          width: SIZES.width,
        },
        filterModalContainerAnimatedStyle,
      ]}
    >
      {/* bg */}
      <Animated.View
        style={[
          {
            flex: 1,
            height: SIZES.height,
            width: SIZES.width,
            backgroundColor: COLORS.transparentBlack7,
          },
          filterModalBgAnimatedStyle,
        ]}
      >
        {/* content */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 0,
              height: SIZES.height * 0.9,
              width: SIZES.width,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: COLORS.white,
            },
            filterModalContentAnimatedStyle,
          ]}
        >
          {/* header */}
          <View
            style={{
              marginTop: SIZES.padding,
              flexDirection: 'row',
              paddingHorizontal: SIZES.padding,
            }}
          >
            <View
              style={{
                width: 60,
              }}
            />

            <Text
              style={{
                flex: 1,
                textAlign: 'center',
                ...FONTS.h1,
              }}
            >
              Filter
            </Text>

            <TextButton
              label="Cancel"
              containerStyle={{
                width: 60,
                backgroundColor: null,
              }}
              labelStyle={{
                color: COLORS.black,
                ...FONTS.body3,
              }}
              onPress={() => {
                filterModalSharedValue2.value = withTiming(SIZES.height, {
                  duration: 500,
                });

                filterModalSharedValue1.value = withDelay(
                  500,
                  withTiming(SIZES.height, { duration: 100 })
                );
              }}
            />
          </View>

          {/* content */}
          <ScrollView
            contentContainerStyle={{
              paddingHorizontal: SIZES.padding,
              paddingBottom: 50,
            }}
          >
            {/* class type */}
            <View
              style={{
                marginTop: SIZES.radius,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                }}
              >
                Class Type
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  marginTop: SIZES.radius,
                }}
              >
                {constants.class_types.map((i, idx) => (
                  <ClassTypeOption
                    classType={i}
                    key={`ClassType-${idx}`}
                    isSelected={classType === i.id}
                    containerStyle={{
                      marginLeft: idx === 0 ? 0 : SIZES.base,
                    }}
                    onPress={() => {
                      setClassType(i.id);
                    }}
                  />
                ))}
              </View>
            </View>

            {/* class level */}
            <View
              style={{
                marginTop: SIZES.padding,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                }}
              >
                Class Level
              </Text>

              <View>
                {constants.class_levels.map((i, idx) => (
                  <ClassLevelOption
                    key={`ClassLevel-${idx}`}
                    classLevel={i}
                    isLastItem={idx === constants.class_levels.length - 1}
                    isSelected={classLevel === i.id}
                    onPress={() => {
                      setClassLevel(i.id);
                    }}
                  />
                ))}
              </View>
            </View>

            {/* created within */}
            <View
              style={{
                marginTop: SIZES.radius,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                }}
              >
                Created Within
              </Text>

              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                }}
              >
                {constants.created_within.map((i, idx) => (
                  <TextButton
                    key={`CreatedWithin-${idx}`}
                    label={i.label}
                    containerStyle={{
                      height: 45,
                      paddingHorizontal: SIZES.radius,
                      marginLeft: idx % 3 === 0 ? 0 : SIZES.radius,
                      marginTop: SIZES.radius,
                      borderWidth: 1,
                      borderRadius: SIZES.radius,
                      borderColor: COLORS.gray20,
                      backgroundColor:
                        createdWithin === i.id ? COLORS.primary3 : null,
                    }}
                    labelStyle={{
                      color:
                        createdWithin === i.id ? COLORS.white : COLORS.black,
                      ...FONTS.body3,
                    }}
                    onPress={() => {
                      setCreatedWithin(i.id);
                    }}
                  />
                ))}
              </View>
            </View>

            {/* class length */}
            <View
              style={{
                marginTop: SIZES.padding,
              }}
            >
              <Text
                style={{
                  ...FONTS.h3,
                }}
              >
                Class Length
              </Text>

              <View
                style={{
                  alignItems: 'center',
                }}
              >
                <TwoPointSlider
                  values={[20, 50]}
                  min={15}
                  max={60}
                  postfix="min"
                  onValuesChange={(v) => {
                    // console.log(v);
                  }}
                />
              </View>
            </View>
          </ScrollView>

          {/* footer */}
          {renderFooter()}
        </Animated.View>
      </Animated.View>
    </Animated.View>
  );
};

export default FilterModal;
