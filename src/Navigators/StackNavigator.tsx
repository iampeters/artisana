import * as React from 'react';
// import { createStackNavigator } from '@react-navigation/stack';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { useTheme } from '@react-navigation/native';
import { TransitionPresets } from '@react-navigation/stack';

import Onboarding from '../Routes/Onboarding';
import Login from '../Routes/Login';
import Register from '../Routes/Register';
import GetStarted from '../Routes/GetStarted';
import ForgotPassword from '../Routes/ForgotPassword';
import DrawerNavigator from './DrawerNavigator';
import Dashboard from '../Routes/Dashboard';
import AddArtisan from '../Routes/AddArtisan';
import Account from '../Routes/Account';
import Profile from '../Routes/Profile';
import ChangePassword from '../Routes/ChangePassword';
// import Signin from '../pages/Signin/Signin';
// import Signup from '../pages/Signup/Signup';
// import SplashScreen from '../pages/splashScreen/SplashScreen';
// import DrawerNavigator from './DrawerNavigator';

const Stack = createSharedElementStackNavigator();

export default function StackNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      headerMode='none'
      initialRouteName='GetStarted'
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        gestureEnabled: false,
        cardStyleInterpolator: ({ current: { progress } }) => {
          const opacity = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolate: 'clamp',
          });
          return { cardStyle: { opacity } };
        },
        cardStyle: {
          backgroundColor: 'transparent',
        },
      }}
    >
      {/* <Stack.Screen name='SplashScreen' component={Onboarding} /> */}
      <Stack.Screen name='GetStarted' component={GetStarted} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='Auth' component={DrawerNavigator} />
      {/* <Stack.Screen
        name='Account'
        component={Account}
        sharedElements={(route: any) => {
          const { data } = route.params;
          return [`user.${data._id}`];
        }} /> */}
      {/* <Stack.Screen name='Home' component={DrawerNavigator} /> */}
    </Stack.Navigator>
  );
}