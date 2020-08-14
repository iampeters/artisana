import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo';
import configureStore from './src/Redux/configureStore';
import 'react-native-gesture-handler';
import { Provider, useSelector, useDispatch } from 'react-redux';
import { Root, Text, Toast } from 'native-base';
import { PersistGate } from 'redux-persist/integration/react';
import { NavigationContainer, useTheme } from '@react-navigation/native';
import { AppearanceProvider } from 'react-native-appearance';
import RootTheme from './src/Themes';
import { CustomThemeInterface } from './src/Utils/Interfaces/interfaces';
import StackNavigator from './src/Navigators/StackNavigator';
import { Reducers } from './src/interfaces/interface';
const { store, persistor } = configureStore();

export default () => {
  let [fontsLoaded] = useFonts({
    // Lemonada
    LemonadaRegular: require('./assets/Fonts/Lemonada-Regular.ttf'),
    LemonadaMedium: require('./assets/Fonts/Lemonada-Medium.ttf'),
    LemonadaLight: require('./assets/Fonts/Lemonada-Light.ttf'),
    LemonadaSemiBold: require('./assets/Fonts/Lemonada-SemiBold.ttf'),
    // ProductSans
    ProductSansRegular: require('./assets/Fonts/ProductSans-Regular.ttf'),
    ProductSansMedium: require('./assets/Fonts/ProductSans-Medium.ttf'),
    ProductSansLight: require('./assets/Fonts/ProductSans-Light.ttf'),
    ProductSansItalic: require('./assets/Fonts/ProductSans-Italic.ttf'),
    ProductSansBold: require('./assets/Fonts/ProductSans-Bold.ttf'),
    // Rubik
    RubikRegular: require('./assets/Fonts/Rubik-Regular.ttf'),
    RubikMedium: require('./assets/Fonts/Rubik-Medium.ttf'),
    RubikLight: require('./assets/Fonts/Rubik-Light.ttf'),
    RubikItalic: require('./assets/Fonts/Rubik-Italic.ttf'),
    RubikBold: require('./assets/Fonts/Rubik-Bold.ttf'),
    // Roboto
    Roboto_medium: require('./assets/Fonts/Roboto_medium.ttf'),
    Roboto: require('./assets/Fonts/Roboto.ttf'),
  });
  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Root>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <StatusBar style="auto" />
            <App />
          </PersistGate>
        </Provider>
      </Root>
    );
  }
};

const App = () => {
  const theme = useSelector((state: any) => state.theme);
  const { colors, fonts }: CustomThemeInterface = useTheme();
  
  const alert = useSelector((state: Reducers) => state.alert);

  const dispatch = useDispatch();

  const getTheme = () => {

    switch (theme) {
      case 'dark': {
        return RootTheme.Dark;
      }

      case 'light': {
        return RootTheme.Light;
      }

      case 'blue': {
        return RootTheme.Blue;
      }

      default:
        return RootTheme.Dark;
    }
  };

  const displayAlert = (
    type: 'danger' | 'warning' | 'success',
    message: string
  ) => {
    Toast.show({
      text: message,
      buttonText: 'Dismiss',
      type: type,
      position: 'bottom',
      duration: 5000,
      buttonTextStyle: {
        color: colors.dark,
        fontFamily: fonts?.ProductSansRegular,
      },
      buttonStyle: {
        borderRadius: 20,
        // elevation: 1,
        // backgroundColor: '#fff',
      },
      // style: { backgroundColor: '#ff3d71' },
      textStyle: {
        color: '#fff',
        fontFamily: fonts?.ProductSansRegular,
      },
      onClose: () =>
        dispatch({
          type: 'ALERT',
          payload: Object.assign({}, {}),
        }),
    });
  };

  React.useEffect(() => {
    if (Object.entries(alert).length !== 0) {
      if (alert.successful) {
        displayAlert("success", alert.message)
      } else {
        displayAlert("danger", alert.message)
      }
    }
  }, [alert]);

  return (
    <AppearanceProvider>
      <NavigationContainer theme={getTheme()}>
        <StackNavigator />
      </NavigationContainer>
    </AppearanceProvider>

  );
}
