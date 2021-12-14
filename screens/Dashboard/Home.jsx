import React, { useCallback } from 'react';
import { View, Text, ImageBackground, Image, ScrollView } from 'react-native';

import { FlatList } from 'react-native-gesture-handler';
import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
  dummyData,
} from '../../constants';
import IconButton from '../../components/IconButton';
import TextButton from '../../components/TextButton';
import CourseCard from '../../components/CourseCard';
import Line from '../../components/Line';
import CategoryCard from '../../components/CategoryCard';
import HorizontalCourseCard from '../../components/HorizontalCourseCard';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
  const navigation = useNavigation();

  const renderHeader = useCallback(() => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 40,
          marginBottom: 10,
          paddingHorizontal: SIZES.padding,
          alignItems: 'center',
        }}
      >
        <View style={{ flex: 1 }}>
          <Text style={{ ...FONTS.h2 }}>Hello, Learners!</Text>
          <Text style={{ color: COLORS.gray50, ...FONTS.body3 }}>
            Friday, 5th Nov 2021
          </Text>
        </View>

        <IconButton
          icon={icons.notification}
          iconStyle={{ tintColor: COLORS.black }}
        />
      </View>
    );
  }, [SIZES, FONTS, COLORS]);

  const renderStartLearning = useCallback(() => {
    return (
      <ImageBackground
        source={images.featured_bg_image}
        style={{
          alignItems: 'flex-start',
          marginTop: SIZES.padding,
          marginHorizontal: SIZES.padding,
          padding: 15,
        }}
        imageStyle={{ borderRadius: SIZES.radius }}
      >
        {/* info */}
        <View>
          <Text style={{ color: COLORS.white, ...FONTS.body2 }}>HOW TO</Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            Make your brand more visible with our checklist
          </Text>
          <Text
            style={{
              marginTop: SIZES.radius,
              color: COLORS.white,
              ...FONTS.body4,
            }}
          >
            By Scott Harris
          </Text>
        </View>

        {/* image */}
        <Image
          source={images.start_learning}
          style={{ width: '100%', height: 110, marginTop: SIZES.padding }}
        />
        {/* button */}
        <TextButton
          label="Start Learning"
          containerStyle={{
            height: 40,
            paddingHorizontal: SIZES.padding,
            borderRadius: 20,
            backgroundColor: COLORS.white,
          }}
          labelStyle={{ color: COLORS.black }}
        />
      </ImageBackground>
    );
  }, [images, SIZES, COLORS, FONTS]);

  const renderCourses = useCallback(() => {
    return (
      <FlatList
        horizontal
        data={dummyData.courses_list_1}
        listKey="Courses"
        keyExtractor={(i) => `Courses-${i.id}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ marginTop: SIZES.padding }}
        renderItem={({ item, index }) => (
          <CourseCard
            course={item}
            containerStyle={{
              marginLeft: index === 0 ? SIZES.padding : SIZES.radius,
              marginRight:
                index === dummyData.courses_list_1.length - 1
                  ? SIZES.padding
                  : 0,
            }}
          />
        )}
      />
    );
  }, []);

  const Section = useCallback(
    ({ containerStyle, title, onPress, children }) => {
      return (
        <View style={containerStyle}>
          <View
            style={{ flexDirection: 'row', paddingHorizontal: SIZES.padding }}
          >
            <Text style={{ flex: 1, ...FONTS.h2 }}>{title}</Text>
            <TextButton
              containerStyle={{
                width: 80,
                borderRadius: 30,
                backgroundColor: COLORS.primary,
              }}
              label="See All"
              onPress={onPress}
            />
          </View>
          {children}
        </View>
      );
    },
    [SIZES, FONTS]
  );

  const renderCategories = useCallback(() => {
    return (
      <Section title="Categories">
        <FlatList
          horizontal
          data={dummyData.categories}
          listKey="Categories"
          keyExtractor={(i) => `Categories-${i.id}`}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ marginTop: SIZES.radius }}
          renderItem={({ item, index }) => (
            <CategoryCard
              sharedElementPrefix="Home"
              category={item}
              containerStyle={{
                marginLeft: index === 0 ? SIZES.padding : SIZES.base,
                marginRight:
                  index === dummyData.categories.length - 1 ? SIZES.padding : 0,
              }}
              onPress={() =>
                navigation.navigate('CourseListing', {
                  category: item,
                  sharedElementPrefix: 'Home',
                })
              }
            />
          )}
        />
      </Section>
    );
  }, [SIZES, dummyData]);

  const renderPopularCourses = useCallback(() => {
    return (
      <Section
        title="Popular Courses"
        containerStyle={{
          marginTop: 30,
        }}
      >
        <FlatList
          data={dummyData.courses_list_2}
          listKey="PopularCourses"
          scrollEnabled={false}
          keyExtractor={(i) => `PopularCourses-${i.id}`}
          contentContainerStyle={{
            marginTop: SIZES.radius,
            paddingHorizontal: SIZES.padding,
          }}
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
            <Line lineStyle={{ backgroundColor: COLORS.gray10 }} />
          )}
        />
      </Section>
    );
  }, [SIZES, dummyData]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {/* header */}
      {renderHeader()}
      {/* content */}
      <ScrollView
        contentContainerStyle={{ paddingBottom: 150 }}
        showsVerticalScrollIndicator={false}
      >
        {/* Start learning */}
        {renderStartLearning()}

        {/* courses section */}
        {renderCourses()}

        {/* line */}
        <Line lineStyle={{ marginVertical: SIZES.padding }} />

        {/* Categories */}
        {renderCategories()}

        {/* popular courses */}
        {renderPopularCourses()}
      </ScrollView>
    </View>
  );
};

export default Home;
