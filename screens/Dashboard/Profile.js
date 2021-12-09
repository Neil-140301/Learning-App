import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

import IconButton from '../../components/IconButton';
import TextButton from '../../components/TextButton';
import ProfileValue from '../../components/ProfileValue';
import Line from '../../components/Line';

import { COLORS, SIZES, FONTS, icons, images } from '../../constants';
import ProgressBar from '../../components/ProgressBar';
import ProfileRadioBtn from '../../components/ProfileRadioBtn';

const Profile = () => {
  const [newCourse, setNewCourse] = useState(false);
  const [studyReminder, setStudyReminder] = useState(false);

  const renderHeader = useCallback(() => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          paddingHorizontal: SIZES.padding,
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ ...FONTS.h1 }}>Profile</Text>
        <IconButton icon={icons.sun} iconStyle={{ tintColor: COLORS.black }} />
      </View>
    );
  }, []);

  const renderProfileCard = useCallback(() => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: COLORS.primary3,
        }}
      >
        {/* image */}
        <TouchableOpacity
          style={{
            width: 80,
            height: 80,
          }}
        >
          <Image
            source={images.profile}
            style={{
              width: '100%',
              height: '100%',
              borderRadius: 40,
              borderWidth: 1,
              borderColor: COLORS.white,
            }}
          />

          <View
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              alignItems: 'center',
              justifyContent: 'flex-end',
            }}
          >
            <View
              style={{
                width: 30,
                height: 30,
                marginBottom: -15,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 15,
                backgroundColor: COLORS.primary,
              }}
            >
              <Image
                source={icons.camera}
                resizeMode="contain"
                style={{
                  width: 17,
                  height: 17,
                }}
              />
            </View>
          </View>
        </TouchableOpacity>

        {/* details */}
        <View
          style={{
            flex: 1,
            marginLeft: SIZES.radius,
            alignItems: 'flex-start',
          }}
        >
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.h2,
            }}
          >
            Lama_1403
          </Text>
          <Text
            style={{
              color: COLORS.white,
              ...FONTS.body4,
            }}
          >
            Full Stack Developer
          </Text>

          <ProgressBar
            progress="58%"
            containerStyle={{
              marginTop: SIZES.radius,
            }}
          />

          <View
            style={{
              flexDirection: 'row',
            }}
          >
            <Text
              style={{
                flex: 1,
                color: COLORS.white,
                ...FONTS.body4,
              }}
            >
              Overall Progress
            </Text>

            <Text
              style={{
                color: COLORS.white,
                ...FONTS.body4,
              }}
            >
              58%
            </Text>
          </View>

          {/* become member */}
          <TextButton
            label="+ Become Member"
            containerStyle={{
              height: 35,
              marginTop: SIZES.padding,
              paddingHorizontal: SIZES.radius,
              borderRadius: 20,
              backgroundColor: COLORS.white,
            }}
            labelStyle={{
              color: COLORS.primary,
            }}
          />
        </View>
      </View>
    );
  }, []);

  const renderPS1 = useCallback(() => {
    return (
      <View style={styles.profileSectionContainer}>
        <ProfileValue icon={icons.profile} label="Name" value="Lama Dev" />
        <Line />
        <ProfileValue icon={icons.email} label="Email" value="Lama@gmail.com" />
        <Line />
        <ProfileValue
          icon={icons.password}
          label="Password"
          value="Updated 2 weeks ago"
        />
        <Line />
        <ProfileValue
          icon={icons.call}
          label="Contact Number"
          value="+698753210"
        />
      </View>
    );
  }, []);

  const renderPS2 = useCallback(() => {
    return (
      <View style={styles.profileSectionContainer}>
        <ProfileValue icon={icons.star_1} value="Pages" />
        <Line />
        <ProfileRadioBtn
          icon={icons.new_icon}
          label="New Course Notifications"
          isSelected={newCourse}
          onPress={() => setNewCourse((s) => !s)}
        />
        <Line />
        <ProfileRadioBtn
          icon={icons.reminder}
          label="Study Reminder"
          isSelected={studyReminder}
          onPress={() => setStudyReminder((s) => !s)}
        />
      </View>
    );
  }, [newCourse, studyReminder, setNewCourse, setStudyReminder]);

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.white }}>
      {renderHeader()}

      {/* content */}
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding,
          paddingBottom: 150,
        }}
      >
        {/* profile card */}
        {renderProfileCard()}

        {/* profile section 1 */}
        {renderPS1()}

        {/* profile section 2 */}
        {renderPS2()}
      </ScrollView>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profileSectionContainer: {
    marginTop: SIZES.padding,
    paddingHorizontal: SIZES.padding,
    borderWidth: 1,
    borderRadius: SIZES.radius,
    borderColor: COLORS.gray20,
  },
});
