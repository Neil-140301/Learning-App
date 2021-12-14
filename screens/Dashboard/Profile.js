import React, { useState } from 'react';
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

import {
  COLORS,
  SIZES,
  FONTS,
  icons,
  images,
  darkTheme,
  lightTheme,
} from '../../constants';
import ProgressBar from '../../components/ProgressBar';
import ProfileRadioBtn from '../../components/ProfileRadioBtn';

// import { connect } from 'react-redux';
import { toggleTheme } from '../../redux/themeActions';
import { useDispatch, useSelector } from 'react-redux';

const Profile = () => {
  const [newCourse, setNewCourse] = useState(false);
  const [studyReminder, setStudyReminder] = useState(false);
  const appTheme = useSelector((state) => state.theme.appTheme);
  const dispatch = useDispatch();

  //redux
  const toggleThemeHandler = () => {
    if (appTheme.name === 'light') {
      toggleTheme('dark', dispatch);
    } else {
      toggleTheme('light', dispatch);
    }
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: 50,
          paddingHorizontal: SIZES.padding,
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ color: appTheme?.textColor, ...FONTS.h1 }}>Profile</Text>
        <IconButton
          icon={icons.sun}
          iconStyle={{ tintColor: appTheme?.tintColor }}
          onPress={() => toggleThemeHandler()}
        />
      </View>
    );
  };

  const renderProfileCard = () => {
    return (
      <View
        style={{
          flexDirection: 'row',
          marginTop: SIZES.padding,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 20,
          borderRadius: SIZES.radius,
          backgroundColor: appTheme?.backgroundColor2,
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
              backgroundColor: appTheme?.backgroundColor4,
            }}
            labelStyle={{
              color: appTheme?.textColor2,
            }}
          />
        </View>
      </View>
    );
  };

  const renderPS1 = () => {
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
  };

  const renderPS2 = () => {
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
  };

  return (
    <View style={{ flex: 1, backgroundColor: appTheme?.backgroundColor1 }}>
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

// const mapStateToProps = (state) => {
//   return {
//     appTheme: state.appTheme,
//     error: state.error,
//   };
// };

// export const mapDispatchToProps = (dispatch) => {
//   return {
//     toggleTheme: (themeType) => {
//       return dispatch(toggleTheme(themeType));
//     },
//   };
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Profile);
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
