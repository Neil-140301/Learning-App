import React, {
  createRef,
  useCallback,
  useRef,
  useState,
  useEffect,
} from 'react';
import { View, Text, TouchableOpacity, Image, Animated } from 'react-native';

import { COLORS, SIZES, FONTS, constants } from '../../constants';
import Home from './Home';
import Search from './Search';
import Profile from './Profile';
import { Shadow } from 'react-native-shadow-2';
import { useSelector } from 'react-redux';

const bottom_tabs = constants.bottom_tabs.map((i) => {
  return {
    ...i,
    ref: createRef(),
  };
});

const MainLayout = () => {
  const flatListRef = useRef();
  const scrollX = useRef(new Animated.Value(0)).current;
  const appTheme = useSelector((state) => state.theme.appTheme);

  const handleTabPress = useCallback(
    (tabIndex) => {
      flatListRef?.current?.scrollToOffset({ offset: tabIndex * SIZES.width });
    },
    [flatListRef, SIZES]
  );

  const renderContent = useCallback(() => {
    return (
      <View style={{ flex: 1 }}>
        <Animated.FlatList
          ref={flatListRef}
          horizontal
          scrollEnabled={false}
          pagingEnabled
          snapToAlignment="center"
          snapToInterval={SIZES.width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          data={constants.bottom_tabs}
          keyExtractor={(item) => `Main-${item.id}`}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          renderItem={({ item }) => {
            return (
              <View
                style={{
                  height: SIZES.height,
                  width: SIZES.width,
                }}
              >
                {item.label === constants.screens.home && <Home />}
                {item.label === constants.screens.search && <Search />}
                {item.label === constants.screens.profile && <Profile />}
              </View>
            );
          }}
        />
      </View>
    );
  }, [flatListRef, scrollX, SIZES, constants, Home, Search, Profile]);

  const TabIndicator = useCallback(
    ({ measureLayout, scrollX }) => {
      const inputRange = bottom_tabs.map((_, i) => i * SIZES.width);
      const tabIndicatorWidth = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map((m) => m.width),
      });

      const translateX = scrollX.interpolate({
        inputRange,
        outputRange: measureLayout.map((m) => m.x),
      });

      return (
        <Animated.View
          style={{
            position: 'absolute',
            left: 0,
            height: '100%',
            width: tabIndicatorWidth,
            transform: [{ translateX }],
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.primary,
          }}
        />
      );
    },
    [SIZES, COLORS, bottom_tabs]
  );

  const Tabs = useCallback(
    ({ scrollX }) => {
      const containerRef = useRef();
      const [measureLayout, setMeasureLayout] = useState([]);

      useEffect(() => {
        let ml = [];
        bottom_tabs.forEach((i) => {
          i?.ref?.current?.measureLayout(
            containerRef.current,
            (x, y, width, height) => {
              ml.push({ x, y, width, height });

              if (ml.length === bottom_tabs.length) {
                setMeasureLayout(ml);
              }
            }
          );
        });
      }, [containerRef.current]);

      return (
        <View ref={containerRef} style={{ flex: 1, flexDirection: 'row' }}>
          {measureLayout.length > 0 && (
            <TabIndicator measureLayout={measureLayout} scrollX={scrollX} />
          )}

          {bottom_tabs.map(({ ref, icon, label }, idx) => {
            return (
              <TouchableOpacity
                key={`BottomTab-${idx}`}
                ref={ref}
                style={{
                  flex: 1,
                  padding: 15,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onPress={() => handleTabPress(idx)}
              >
                <Image
                  source={icon}
                  resizeMode="contain"
                  style={{ width: 25, height: 25 }}
                />

                <Text
                  style={{ marginTop: 3, color: COLORS.white, ...FONTS.h3 }}
                >
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      );
    },
    [bottom_tabs, COLORS, FONTS, handleTabPress]
  );

  const renderBottomTab = useCallback(() => {
    return (
      <View
        style={{
          paddingBottom: SIZES.height > 800 ? 20 : 5,
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.radius,
          backgroundColor: appTheme?.backgroundColor1,
        }}
      >
        <Shadow size={[SIZES.width - SIZES.padding * 2, 85]}>
          <View
            style={{
              flex: 1,
              borderRadius: SIZES.radius,
              backgroundColor: appTheme?.backgroundColor2,
            }}
          >
            <Tabs scrollX={scrollX} />
          </View>
        </Shadow>
      </View>
    );
  }, [SIZES, scrollX, COLORS, appTheme]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      {/* content */}
      {renderContent()}

      {/* bottom tab */}
      {renderBottomTab()}
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

export default MainLayout;
