import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '@react-navigation/native';
import Onboarding from '../Routes/Onboarding';
import Login from '../Routes/Login';
import Register from '../Routes/Register';
import GetStarted from '../Routes/GetStarted';
import ForgotPassword from '../Routes/ForgotPassword';
import DrawerNavigator from './DrawerNavigator';
// import Signin from '../pages/Signin/Signin';
// import Signup from '../pages/Signup/Signup';
// import SplashScreen from '../pages/splashScreen/SplashScreen';
// import DrawerNavigator from './DrawerNavigator';

const Stack = createStackNavigator();

export default function StackNavigator() {
  const { colors } = useTheme();
  return (
    <Stack.Navigator
      headerMode='none'
      initialRouteName='GetStarted'
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.background,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      {/* <Stack.Screen name='SplashScreen' component={Onboarding} /> */}
      <Stack.Screen name='GetStarted' component={GetStarted} />
      <Stack.Screen name='Login' component={Login} />
      <Stack.Screen name='Register' component={Register} />
      <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
      <Stack.Screen name='Auth' component={DrawerNavigator} />
      {/* <Stack.Screen name='Home' component={DrawerNavigator} /> */}
    </Stack.Navigator>
  );
}