import React, { useRef } from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

import IconButton from '../../components/IconButton';
import HorizontalCourseCard from '../../components/HorizontalCourseCard';
import Line from '../../components/Line';

import { SharedElement } from 'react-navigation-shared-element';

import {
  COLORS,
  SIZES,
  FONTS,
  images,
  icons,
  dummyData,
} from '../../constants';
import FilterModal from '../../components/FilterModal';

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const HeaderHeight = 250;

const CourseListing = ({ navigation, route }) => {
  const { category, sharedElementPrefix } = route.params;
  const headerSharedValue = useSharedValue(80);

  const flatListRef = useRef();
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y;
  });

  const filterModalSharedValue1 = useSharedValue(SIZES.height);
  const filterModalSharedValue2 = useSharedValue(SIZES.height);

  const backHandler = () => {
    navigation.goBack();
  };

  const renderHeader = () => {
    const inputRange = [0, HeaderHeight - 50];
    headerSharedValue.value = withDelay(500, withTiming(0, { duration: 500 }));

    const headerFadeAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(headerSharedValue.value, [80, 0], [0, 1]),
      };
    });

    const headerTranslateAnimatedStyle = useAnimatedStyle(() => {
      return {
        transform: [
          {
            translateY: headerSharedValue.value,
          },
        ],
      };
    });

    const headerHeightAnimatedStyle = useAnimatedStyle(() => {
      return {
        height: interpolate(
          scrollY.value,
          inputRange,
          [HeaderHeight, 120],
          Extrapolate.CLAMP
        ),
      };
    });

    const headerHideAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [0, 1], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [0, 200],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    });

    const headerShowAnimatedStyle = useAnimatedStyle(() => {
      return {
        opacity: interpolate(scrollY.value, [80, 0], [1, 0], Extrapolate.CLAMP),
        transform: [
          {
            translateY: interpolate(
              scrollY.value,
              inputRange,
              [50, 130],
              Extrapolate.CLAMP
            ),
          },
        ],
      };
    });

    return (
      <Animated.View
        style={[
          {
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            height: 250,
            overflow: 'hidden',
          },
          headerHeightAnimatedStyle,
        ]}
      >
        <SharedElement
          id={`${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`}
          style={[StyleSheet.absoluteFillObject]}
        >
          <Image
            source={category?.thumbnail}
            resizeMode="cover"
            style={{
              height: '100%',
              width: '100%',
              borderBottomLeftRadius: 60,
            }}
          />
        </SharedElement>

        {/* title */}
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: -80,
              left: 0,
              right: 0,
            },
            headerShowAnimatedStyle,
          ]}
        >
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            {category?.title}
          </Text>
        </Animated.View>

        <Animated.View
          style={[
            {
              position: 'absolute',
              bottom: 70,
              left: 30,
            },
            headerHideAnimatedStyle,
          ]}
        >
          <SharedElement
            id={`${sharedElementPrefix}-CategoryCard-Title-${category?.id}`}
            style={[StyleSheet.absoluteFillObject]}
          >
            <Text
              style={{ position: 'absolute', color: COLORS.white, ...FONTS.h1 }}
            >
              {category?.title}
            </Text>
          </SharedElement>
        </Animated.View>

        {/* back - animate the fade effect */}
        <Animated.View>
          <IconButton
            icon={icons.back}
            iconStyle={{
              tintColor: COLORS.black,
            }}
            containerStyle={{
              position: 'absolute',
              top: 40,
              left: 20,
              width: 50,
              height: 50,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 25,
              backgroundColor: COLORS.white,
            }}
            onPress={() => {
              if (scrollY.value > 0 && scrollY.value < 200) {
                flatListRef.current?.scrollToOffset({
                  offset: 0,
                  animated: true,
                });

                setTimeout(() => {
                  headerSharedValue.value = withTiming(
                    80,
                    { duration: 500 },
                    () => {
                      runOnJS(backHandler);
                    }
                  );
                }, 100);
              } else {
                backHandler();
              }
            }}
          />
        </Animated.View>

        {/* category image */}
        <Animated.Image
          source={images.mobile_image}
          resizeMode="contain"
          style={[
            {
              position: 'absolute',
              right: 40,
              bottom: -40,
              width: 100,
              height: 200,
            },
            headerFadeAnimatedStyle,
            headerTranslateAnimatedStyle,
            headerHideAnimatedStyle,
          ]}
        />
      </Animated.View>
    );
  };

  const renderResults = () => {
    return (
      <AnimatedFlatlist
        ref={flatListRef}
        data={dummyData.courses_list_2}
        keyExtractor={(i) => `Results-${i.id}`}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
        }}
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        keyboardDismissMode="on-drag"
        onScroll={onScroll}
        ListHeaderComponent={
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: 270,
              marginBottom: SIZES.base,
            }}
          >
            <Text
              style={{
                flex: 1,
                ...FONTS.body3,
              }}
            >
              5,761 Results{' '}
            </Text>

            <IconButton
              icon={icons.filter}
              iconStyle={{
                width: 20,
                height: 20,
              }}
              containerStyle={{
                width: 40,
                height: 40,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 10,
                backgroundColor: COLORS.primary,
              }}
              onPress={() => {
                filterModalSharedValue1.value = withTiming(0, {
                  duration: 500,
                });

                filterModalSharedValue2.value = withDelay(
                  100,
                  withTiming(0, { duration: 500 })
                );
              }}
            />
          </View>
        }
        renderItem={({ item, index }) => (
          <HorizontalCourseCard
            course={item}
            containerStyle={{
              marginVertical: SIZES.padding,
              marginTop: index === 0 ? SIZES.radius : SIZES.padding,
            }}
          />
        )}
        ItemSeparatorComponent={() => (
          <Line
            lineStyle={{
              backgroundColor: COLORS.gray20,
            }}
          />
        )}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/* results */}
      {renderResults()}

      {/* header */}
      {renderHeader()}

      {/* filter modal */}
      <FilterModal
        filterModalSharedValue1={filterModalSharedValue1}
        filterModalSharedValue2={filterModalSharedValue2}
      />
    </View>
  );
};

CourseListing.sharedElements = (route, otherRoute, showing) => {
  const { category, sharedElementPrefix } = route.params;
  return [
    {
      id: `${sharedElementPrefix}-CategoryCard-Bg-${category?.id}`,
    },
    {
      id: `${sharedElementPrefix}-CategoryCard-Title-${category?.id}`,
    },
  ];
};

export default CourseListing;
