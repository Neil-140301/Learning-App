import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { MainLayout, CourseListing } from './screens';
import { useFonts } from '@use-expo/font';
import AppLoading from 'expo-app-loading';

// import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { store } from './redux/store';
// import thunk from 'redux-thunk';
import themeReducer from './redux/themeReducer';
// const store = createStore(themeReducer, applyMiddleware(thunk));

import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Easing } from 'react-native';

const Stack = createSharedElementStackNavigator();
const options = {
  gestureEnabled: false,
  transitionSpec: {
    open: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
    close: {
      animation: 'timing',
      config: { duration: 400, easing: Easing.inOut(Easing.ease) },
    },
  },
  cardStyleInterpolator: ({ current: { progress } }) => {
    return {
      cardStyle: { opacity: progress },
    };
  },
};

export default function App() {
  const [isLoaded] = useFonts({
    'Roboto-Black': require('./assets/fonts/Roboto-Black.ttf'),
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
    'Roboto-Regular': require('./assets/fonts/Roboto-Regular.ttf'),
  });

  if (!isLoaded) {
    return <AppLoading />;
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            useNativeDriver: true,
            headerShown: false,
          }}
          initialRouteName={'Dashboard'}
          detachInactiveScreens={false}
        >
          <Stack.Screen name="Dashboard" component={MainLayout} />
          <Stack.Screen
            name="CourseListing"
            component={CourseListing}
            options={() => options}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
